<div align="center">

# GÖREV PANOSU

### Modern, hizli ve odaklanmis bir Kanban deneyimi.

<p>
	<strong>Kradvia</strong> tarafindan gelistirildi. Gorevlerini planla, ilerlet ve tamamla.
</p>

![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/Status-Active-34D399?style=for-the-badge)

</div>

## Nedir?

Gorev Panosu, islerini uc sade akista yonetmeni saglayan modern bir Kanban uygulamasidir. Gereksiz ekranlar ve hesap zorunlulugu yoktur: uygulamayi ac, gorevini ekle ve akisini surukle-birak ile yonet.

Tum veriler dogrudan tarayicinda saklanir. Bu sayede uygulama hizli calisir, kurulumdan sonra ekstra bir backend veya veritabani gerektirmez.

## One Cikanlar

| | Ozellik | Aciklama |
| --- | --- | --- |
| [ ] | **Akis tabanli pano** | Yapilacaklar, devam edenler ve tamamlananlar kolonlariyla net ilerleme gorunumu. |
| [ ] | **Surukle ve birak** | Gorevleri kolonlar arasinda tasiyabilir, ayni kolon icinde siralayabilirsin. |
| [ ] | **Detayli gorevler** | Baslik, aciklama, son teslim tarihi ve oncelik bilgisi ekle. |
| [ ] | **Akilli arama** | Baslik veya aciklama icinde aninda arama yap. |
| [ ] | **Acik/koyu tema** | Tercihini koruyan, yumusak gecisli iki tema. |
| [ ] | **Responsive tasarim** | Masaustu, tablet ve mobil ekranlarda rahat kullanim. |
| [ ] | **Yerel depolama** | Gorevlerin `localStorage` ile tarayicinda saklanir. |

## Hizli Baslangic

### Gereksinimler

- Node.js 18 veya daha yeni
- npm 9 veya daha yeni

### Kurulum

```bash
git clone https://github.com/KradviaDEV/gorev-panosu.git
cd gorev-panosu
npm install
npm run dev
```

Gelisme sunucusu basladiginda terminalde verilen yerel adresi tarayicinda ac.

### Uretim derlemesi

```bash
npm run build
npm run preview
```

## Kullanim

1. **Yeni Gorev** butonuyla bir gorev olustur.
2. Baslik ekle; istersen aciklama, son teslim tarihi ve oncelik sec.
3. Gorevi uygun kolona surukleyerek durumunu guncelle.
4. Kart uzerindeki duzenle veya sil aksiyonlarini kullan.
5. Header icindeki arama alanindan gorevlerini filtrele.
6. Tercih ettigin temayi sec; secimin tarayicinda hatirlanir.

## Gorev Verisi

Her gorev su alanlarla saklanir:

```js
{
	id: "benzersiz-id",
	title: "Gorev basligi",
	description: "Istege bagli aciklama",
	label: "none | low | medium | high",
	dueDate: "YYYY-MM-DD",
	status: "todo | inProgress | done"
}
```

Uygulama bir sunucuya istek gondermez. Gorevler ve tema tercihi yalnizca mevcut tarayicinin `localStorage` alaninda tutulur. Tarayici verilerini temizlemek gorevleri de siler.

## Proje Yapisi

```text
gorev-panosu/
├── public/                 # Favicon ve statik dosyalar
├── src/
│   ├── components/
│   │   ├── Board.jsx       # Kolonlarin yonetimi
│   │   ├── Column.jsx      # Kolon ve drop alani
│   │   ├── Modal.jsx       # Gorev ekleme/duzenleme formu
│   │   └── Task.jsx        # Gorev karti ve drag-drop davranisi
│   ├── App.jsx             # Uygulama durumu ve ana akis
│   ├── index.css           # Tasarim sistemi ve responsive stiller
│   └── main.jsx            # React giris noktasi
├── index.html
├── package.json
└── vite.config.js
```

## Komutlar

| Komut | Amac |
| --- | --- |
| `npm run dev` | Gelisme sunucusunu baslatir. |
| `npm run build` | Production derlemesi olusturur. |
| `npm run preview` | Production derlemesini lokal olarak onizler. |
| `npm run lint` | Oxlint ile kaynak kodu kontrol eder. |

## Tasarim Yaklasimi

Arayuz; hizli tarama, dusuk dikkat daginikligi ve belirgin durum sinyalleri uzerine kuruludur. Kolon renkleri akisin durumunu, oncelik renkleri ise aciliyeti anlatir. Cam yuzeyler, yumusak kontrastlar ve kisa gecis animasyonlari bilgi hiyerarsisini korurken uygulamaya karakter kazandirir.

## Katki

1. Projeyi forkla.
2. Yeni bir branch olustur: `git checkout -b feature/yeni-fikir`
3. Degisikligini yap ve `npm run lint` ile kontrol et.
4. Pull request ac ve yaptigin degisikligi kisaca anlat.

## Gelistirici

<div align="center">

**Developed by Kradvia**

</div>
