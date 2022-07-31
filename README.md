# basit-sozluk

Türk Dil Kurumunun sağladığı API ile kelimelere ait bilgileri basit bir düzende sunan modül.

## Nasıl Yüklenir?

```bash
npm install basit-sozluk
```

## Nasıl Kullanılır?

Bu modül sayesinde Türk Dil Kurumunun sağladığı verileri isterseniz saf haliyle alabilirsiniz, ancak dilerseniz de gereksiz parametrelerden arındırılmış bir şekilde alabilirsiniz.

`query` --> Basitleştirilmiş bir şekilde verileri sunar.\
`api_query` --> TDK'den olduğu gibi aktarır.

### Önerilen:

```javascript
const sozluk = require('basit-sozluk');

async function foo(kelime) {
    const output = await sozluk.query(kelime);
    console.log(output);
}

foo('bilgisayar')
```

Çıktı:

```bash
[
  {
    id: '6730',
    ozel: true,
    cogul: true,
    anlamSayisi: 1,
    birlesikKelimelerListesi: 'bilgisayar ağı, bilgisayar korsanı, bilgisayar masası',
    anlamlarListesi: [
      {
        id: '11555',
        fiil: false,
        anlam: 'Çok sayıda aritmetiksel veya mantıksal işlemlerden oluşan bir işi, önceden verilmiş bir programa göre yapıp sonuçlandıran elektronik araç, elektronik beyin',
        ornekCumle: 'Bilgisayarındaki disketi çıkarıyor, resimlerle birlikte büyükçe bir sarı zarfa koyuyor.',
        ornekYazar: 'İnci Aral'
      }
    ]
  }
]
```

Kelimelerin anlam sayısı arttıkça `api_query` oldukça uzun ve karışık bir sonuç gönderiyor.

## Nasıl Katkıda Bulunulur?

Yaptığınız düzenlemeleri [GitHub](https://github.com/furkansimsekli/basit-sozluk) üzerinden [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) ile paylaşabilirsiniz! 

## License
[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
