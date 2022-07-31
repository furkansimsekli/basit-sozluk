/*
        Bu wrapper modülü Türk Dil Kurumunun API'nı kullanmak isteyen
        geliştiriciler için yazdım.

        Detaylar için README.md 'ye göz atabilirsiniz.
*/





const axios = require('axios');


/**
 * Üzerinde düzenleme yapılmamış saf haliyle verileri, TDK Api'ye istek atarak alır
 * ve sonucu dönderir.
 * 
 * @param {String} word Sorgulatılması gereken kelime. 
 * @returns Kelime ile ilgili TDK Api'den gelen veriler.
 */
const api_query = async (word) => {
    try {
        const response = await axios.get(`https://sozluk.gov.tr/gts?ara=${encodeURI(word)}`);
        return response.data;
    } catch (e) {
        console.log("ERROR:", e);
    }
}


/**
 * TDK Api'den gelen gereksiz bir çok parametreyi verilerden arındırır ve verileri 
 * olabildiğince basitleştirir.
 * 
 * @param {String} word Sorgulatılması gereken kelime.
 * @returns Kelime ile ilgili TDK Api'den gelen düzenlenmiş veriler.
 */
const query = async (word) => {
    const data = await api_query(word);
    const prettierData = makePretty(data);
    return prettierData;
}


/**
 * Verileri basitleştirir.
 * 
 * @param {Object} wordsList TDK Api'den dönen listedeki her elemandan biri. O kelimeye ait
 *                           tüm özellikleri içerir. 
 * @returns Kelimeye ait basitleştirilmiş veriler.
 */
const makePretty = (wordsList) => {
    const newWordsList = [];

    for (word of wordsList) {
        let newData = {};

        newData.id = word.kelime_no;
        newData.ozel = word.ozel_mi !== 0 ? true : false;
        newData.cogul = word.cogul_mu !== 0 ? true : false;
        newData.anlamSayisi = parseInt(word.anlam_say);
        newData.birlesikKelimelerListesi = word.birlesikler;
        newData.anlamlarListesi = [];

        for (meaning of word.anlamlarListe) {
            let newMeaning = makeMeaningsPretty(meaning);
            newData.anlamlarListesi.push(newMeaning);
        }

        newWordsList.push(newData);
    }
    return newWordsList;
}


/**
 * Verileri basitleştirir.
 * 
 * @param {Object} meaningData Kelimeye ait anlam verisi.
 * @returns Basitleştirilmiş anlam verisi.
 */
const makeMeaningsPretty = (meaningData) => {
    const newMeaningData = {};
    const ornekVarMı = meaningData.orneklerListe !== undefined;
    let yazarVarMı = false;

    if (ornekVarMı && meaningData.orneklerListe[0].yazar_id !== "0") {
        yazarVarMı = true;
    }

    newMeaningData.id = meaningData.anlam_id;
    newMeaningData.fiil = meaningData.fiil !== "0" ? true : false;
    newMeaningData.anlam = meaningData.anlam;

    if (ornekVarMı) {
        newMeaningData.ornekCumle = meaningData.orneklerListe[0].ornek;

        if (yazarVarMı) {
            newMeaningData.ornekYazar = meaningData.orneklerListe[0].yazar[0].tam_adi;
        } else {
            newMeaningData.ornekYazar = null;
        }

    } else {
        newMeaningData.ornekCumle = null;
        newMeaningData.ornekYazar = null;
    }
    return newMeaningData;
}


module.exports.api_query = api_query;
module.exports.query = query;
