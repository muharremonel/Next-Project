import React, {useState} from 'react';
import {FilledsQuote, President, PresidentMobile} from "@/svgImports";

type PresidentBannerProps = {
    mobile: boolean
}
const Index = ({mobile}: PresidentBannerProps) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={"w-full h-full flex justify-center px-4 md:px-40 py-4 md:py-20 bg-primary"}>
            <div className={"w-full object-cover flex flex-col justify-center items-center gap-4 md:gap-8"}>

                {mobile ?
                    <PresidentMobile className={"md:w-auto sm:w-auto object-cover"}/>
                    :
                    <President className={"w-1/2 md:w-auto sm:w-auto object-cover"}/>
                }
                <FilledsQuote className={"md:w-auto"}/>
                <div
                    className={"text-white text-center flex flex-col gap-4 md:gap-8 w-full md:w-3/5 text-sm md:text-base"}>
                    <div>
                        Türkiye Yüzyılı&apos;nın kapılarını araladığımız bugünlerde ülkemizin 2053 ve 2071 hedeflerine
                        ulaşabilmesi adına Kağıthane Belediyesi olarak çalışmalarımızı kararlılıkla sürdürüyoruz.
                        Geleceğin, teknolojiyle şekillendiğinin farkındayız.
                    </div>
                    {!showMore ? (
                        // Bu buton sadece "md" (640px) ve altı ekran genişliklerinde gösterilecek.
                        <div
                            className="underline text-white px-4 py-2 rounded mt-4 md:hidden"
                            onClick={() => setShowMore(true)}
                        >
                            Daha Fazla
                        </div>
                    ) : (
                        <>
                            {/* Diğer metinler */}
                            <div>
                                &apos;Digithane&apos; projemiz, bu amaçla hayata geçirildi.
                            </div>
                            <div>
                                &apos;Digithane&apos; projemiz gençlerimize ücretsiz stüdyolar temin ediyoruz. Bu
                                stüdyolarımıza
                                gelerek internet siteleri, Instagram, Twitch, Facebook, Twitter, Youtube ve benzeri
                                mecralarda yayınlamak üzere kendi içeriklerini üretebilecekler. Üstelik kamera,
                                mikrofon, ışık, dekor, kayıt, montaj, kısacası prodüksiyon araç ve gereçleri konusunda
                                gençlerimize destek sağlıyoruz. Dahası çekim/ kurgu/ greenbox, yayın/dijital iletişim
                                teknikleri, dijital televizyon yayıncılığı, dijital radyo yayıncılığı ve dijital sinema
                                alanlarında fiziki ve teknik eğitimler vererek kariyer basamaklarını hızlıca
                                yükselmelerine yardımcı oluyoruz.

                                Dünya; bilgi, haber, iletişim, iş ve hatta sosyal yaşama dair konularını teknoloji
                                tabanlı dijital uygulamalar aracılığı ile sürdürüyor. Dijital uygulamaların bu denli
                                hayatımızın içinde oluşu, onu sürekli takip etmeyi ve geliştirmeyi gerekli kılıyor.
                                Geleceğimizi emanet edeceğimiz gençlerimizin dijital dünyada aktif şekilde yer alması,
                                kendi konu ve fikirlerini sunması, içeriklerini üretmesi, kariyerlerini inşa etmesi
                                adına hayata geçirdiğimiz Digithane projemiz; inanıyorum ki yüzyıllık hedeflerimizin
                                gerçekleşmesine büyük katkı sunacak.

                                Gençlerimize daima güveniyor, gereken doğru destek verildiğinde her şeyi
                                başarabileceklerine yürekten inanıyoruz.
                            </div>
                            <div>
                                Saygı ve sevgilerimle...
                            </div>
                            <div>
                                <div>
                                    Mevlüt Öztekin
                                </div>
                                <div>
                                    Kağıthane Belediye Başkanı

                                </div>
                            </div>
                        </>
                    )}

                    {/* Mobilde bu div gizlenirken, tablet ve masaüstü cihazlarda bu div gösterilecektir. */}
                    <div className="hidden md:block">
                        {/* Tam metin burada */}
                        <div className={"flex flex-col gap-4"}>
                            <div>
                                &apos;Digithane&apos; projemiz, bu amaçla hayata geçirildi.

                            </div>
                            <div>
                                &apos;Digithane&apos; projemiz gençlerimize ücretsiz stüdyolar temin ediyoruz. Bu
                                stüdyolarımıza
                                gelerek internet siteleri, Instagram, Twitch, Facebook, Twitter, Youtube ve benzeri
                                mecralarda yayınlamak üzere kendi içeriklerini üretebilecekler. Üstelik kamera,
                                mikrofon, ışık, dekor, kayıt, montaj, kısacası prodüksiyon araç ve gereçleri konusunda
                                gençlerimize destek sağlıyoruz. Dahası çekim/ kurgu/ greenbox, yayın/dijital iletişim
                                teknikleri, dijital televizyon yayıncılığı, dijital radyo yayıncılığı ve dijital sinema
                                alanlarında fiziki ve teknik eğitimler vererek kariyer basamaklarını hızlıca
                                yükselmelerine yardımcı oluyoruz.

                                Dünya; bilgi, haber, iletişim, iş ve hatta sosyal yaşama dair konularını teknoloji
                                tabanlı dijital uygulamalar aracılığı ile sürdürüyor. Dijital uygulamaların bu denli
                                hayatımızın içinde oluşu, onu sürekli takip etmeyi ve geliştirmeyi gerekli kılıyor.
                                Geleceğimizi emanet edeceğimiz gençlerimizin dijital dünyada aktif şekilde yer alması,
                                kendi konu ve fikirlerini sunması, içeriklerini üretmesi, kariyerlerini inşa etmesi
                                adına hayata geçirdiğimiz Digithane projemiz; inanıyorum ki yüzyıllık hedeflerimizin
                                gerçekleşmesine büyük katkı sunacak.

                                Gençlerimize daima güveniyor, gereken doğru destek verildiğinde her şeyi
                                başarabileceklerine yürekten inanıyoruz.
                            </div>
                            <div>
                                Saygı ve sevgilerimle...
                            </div>
                            <div>
                                <div>
                                    Mevlüt Öztekin
                                </div>
                                <div>
                                    Kağıthane Belediye Başkanı

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
