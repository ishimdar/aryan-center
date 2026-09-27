import React, { useState } from 'react';

const AryanFarmCenterGold = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState(null);

    const phone = "+919616047120";
    const address = "Near Madiyapar, Atraulia - Ahiraula Road, Near Post Office, Madiapar, Uttar Pradesh 223223";
    const timing = "Mon - Sun: 8:00 AM – 8:00 PM";
    const mapUrl = "https://maps.app.goo.gl/GnhGyiSG7vvgiZox9"; 
    const logoUrl = "/logo.png"; 

    const services = [
        { id: 1, category: 'farmer', title: 'PM-Kisan e-KYC', icon: 'fa-wheat-awn', color: 'bg-emerald-100 text-emerald-700', desc: 'पीएम किसान सम्मान निधि ई-केवाईसी और नया रजिस्ट्रेशन करवाएं।', docs: ['आधार कार्ड', 'बैंक पासबुक', 'खतौनी / ज़मीन के दस्तावेज़', 'मोबाइल नंबर'] },
        { id: 2, category: 'govt', title: 'आय / जाति / निवास प्रमाण पत्र', icon: 'fa-file-contract', color: 'bg-blue-100 text-blue-700', desc: 'उत्तर प्रदेश शासन द्वारा अधिकृत 3-7 दिनों में डिजिटल प्रमाण पत्र।', docs: ['आधार कार्ड', 'स्वप्रमाणित घोषणा पत्र', 'फोटो', 'पुराना प्रमाण पत्र (यदि हो)'] },
        { id: 3, category: 'banking', title: 'आधार से नकद निकासी (AEPS)', icon: 'fa-piggy-bank', color: 'bg-amber-100 text-amber-700', desc: 'किसी भी बैंक खाते से अंगूठा लगाकर तुरंत नकद निकालें व बैलेंस जांचें।', docs: ['आधार कार्ड', 'बैंक में लिंक मोबाइल'] },
        { id: 4, category: 'id', title: 'आयुष्मान भारत कार्ड', icon: 'fa-heart-pulse', color: 'bg-rose-100 text-rose-700', desc: '₹5 लाख तक का मुफ्त इलाज कार्ड तुरंत बनवाएं व प्रिंट लें।', docs: ['राशन कार्ड / नाम सूची', 'आधार कार्ड', 'मोबाइल नंबर'] },
        { id: 5, category: 'forms', title: 'सरकारी नौकरी ऑनलाइन फॉर्म', icon: 'fa-user-graduate', color: 'bg-purple-100 text-purple-700', desc: 'SSC, UP Police, Railway, TET, Army और सभी भर्ती फॉर्म सटीक भरवाएं।', docs: ['10th/12th/Graduation मार्कशीट', 'फोटो व सिग्नेचर', 'आधार कार्ड', 'जाति प्रमाण पत्र'] },
        { id: 6, category: 'farmer', title: 'खतौनी / भूलेख नकल', icon: 'fa-map-location-dot', color: 'bg-green-100 text-green-700', desc: 'अपनी ज़मीन का खसरा-खतौनी नक्शा तुरंत देखें और प्रमाणित प्रिंट प्राप्त करें।', docs: ['गाटा संख्या / खाता संख्या या नाम'] },
        { id: 7, category: 'id', title: 'नया PAN Card / करेक्शन', icon: 'fa-id-card', color: 'bg-indigo-100 text-indigo-700', desc: '10 मिनट में इंस्टेंट ई-पैन कार्ड या 7 दिनों में फिजिकल पैन कार्ड प्राप्त करें।', docs: ['आधार कार्ड', '2 पासपोर्ट साइज फोटो', 'मोबाइल नंबर'] },
        { id: 8, category: 'banking', title: 'बिजली बिल व रिचार्ज', icon: 'fa-bolt', color: 'bg-yellow-100 text-yellow-700', desc: 'यूपीपीसीएल (UPPCL) बिजली बिल भुगतान, रसीद व मोबाइल/DTH रिचार्ज।', docs: ['बिजली कनेक्शन नंबर / पुराना बिल'] }
    ];

    const filteredServices = services.filter(s => {
        const matchesCat = activeCategory === 'all' || s.category === activeCategory;
        const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
            {/* Top Info Bar */}
            <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                        <span><i className="fa-solid fa-clock text-amber-400 mr-1"></i> {timing}</span>
                        <span><i className="fa-solid fa-location-dot text-amber-400 mr-1"></i> Madiapar, Uttar Pradesh</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href={`tel:${phone}`} className="hover:text-amber-400 transition"><i className="fa-solid fa-phone mr-1"></i> +91 96160 47120</a>
                        <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white px-2.5 py-0.5 rounded flex items-center gap-1 hover:bg-emerald-500 transition">
                            <i className="fa-brands fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* Header / Navigation */}
            <header className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img 
                            src={logoUrl} 
                            alt="आर्यनऑनलाइन फार्म सेंटर" 
                            className="w-12 h-12 object-contain rounded-full border-2 border-amber-500 shadow"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="w-12 h-12 rounded-full bg-amber-500 hidden items-center justify-center text-white text-xl font-bold border-2 border-amber-600 shadow">
                            <i className="fa-solid fa-wheat-awn"></i>
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">आर्यन ऑनलाइन फार्म सेंटर</h1>
                            <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider">Aryan Online Farmcenter • Digital Seva CSC</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-6 font-medium text-slate-700">
                        <a href="#home" className="hover:text-amber-600 transition">होम</a>
                        <a href="#services" className="hover:text-amber-600 transition">सेवाएँ</a>
                        <a href="#contact" className="hover:text-amber-600 transition">संपर्क करें</a>
                        <a 
                            href={`https://wa.me/${phone}?text=${encodeURIComponent("नमस्ते, मुझे ऑनलाइन सेवा की जानकारी चाहिए।")}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:shadow-md transition"
                        >
                            <i className="fa-brands fa-whatsapp mr-2"></i> व्हाट्सएप पर संपर्क करें
                        </a>
                    </div>
                </div>
            </header>

            {/* Live Updates Ticker (Marquee Issue Fixed via CSS class) */}
            <div className="bg-amber-50 border-y border-amber-200 py-2 px-4 flex items-center gap-3 text-sm overflow-hidden">
                <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider whitespace-nowrap shrink-0">
                    📢 ताज़ा अपडेट
                </span>
                <div className="overflow-hidden whitespace-nowrap w-full relative">
                    <div className="custom-marquee text-slate-700 font-medium">
                        PM-Kisan ई-केवाईसी चालू है! • आय, जाति व निवास प्रमाण पत्र के लिए संपर्क करें • यूपी स्कॉलरशिप व नई सरकारी नौकरियों के ऑनलाइन फॉर्म भरे जा रहे हैं।
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section id="home" className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white py-12 md:py-20 px-4 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest inline-block mb-4">
                            अधिकृत CSC व डिजिटल सेवा केंद्र
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
                            आपकी हर डिजिटल और <span className="text-amber-400">सरकारी सेवा</span> का भरोसेमंद केंद्र
                        </h2>
                        <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
                            PM-Kisan, आय-जाति-निवास प्रमाण पत्र, आधार बैंकिंग, पैन कार्ड और सभी सरकारी व ऑनलाइन फॉर्म अब एक ही जगह पर आसानी से करवाएं।
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href={`https://wa.me/${phone}?text=${encodeURIComponent("नमस्ते, मुझे फॉर्म भरवाना है।")}`} target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition">
                                <i className="fa-brands fa-whatsapp text-xl"></i> व्हाट्सएप पर सेवा लें
                            </a>
                            <a href="#services" className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-3 rounded-xl shadow flex items-center gap-2 transition">
                                <i className="fa-solid fa-list-check"></i> सभी सेवाएँ देखें
                            </a>
                        </div>
                    </div>

                    {/* Service Badges */}
                    <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-2xl backdrop-blur border border-white/10">
                        <div className="bg-white/10 p-4 rounded-xl text-center">
                            <i className="fa-solid fa-wheat-awn text-3xl text-amber-400 mb-2"></i>
                            <h4 className="font-bold text-sm">किसान कॉर्नर</h4>
                            <p className="text-xs text-slate-300">PM-Kisan & भूलेख</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl text-center">
                            <i className="fa-solid fa-file-invoice text-3xl text-amber-400 mb-2"></i>
                            <h4 className="font-bold text-sm">सरकारी प्रमाण पत्र</h4>
                            <p className="text-xs text-slate-300">आय, जाति, निवास</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl text-center">
                            <i className="fa-solid fa-piggy-bank text-3xl text-amber-400 mb-2"></i>
                            <h4 className="font-bold text-sm">आधार बैंकिंग</h4>
                            <p className="text-xs text-slate-300">नकद निकासी & बैलेंस</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl text-center">
                            <i className="fa-solid fa-user-graduate text-3xl text-amber-400 mb-2"></i>
                            <h4 className="font-bold text-sm">ऑनलाइन फॉर्म</h4>
                            <p className="text-xs text-slate-300">भर्ती व स्कॉलरशिप</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 max-w-7xl mx-auto px-4 flex-grow">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">हमारी प्रमुख सेवाएँ (Services)</h2>
                    <p className="text-slate-600 text-sm mt-1">अपनी ज़रूरत की सेवा चुनें और आवश्यक डॉक्यूमेंट्स देखें</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {[
                            { id: 'all', name: 'सभी सेवाएँ' },
                            { id: 'farmer', name: '🌾 किसान कॉर्नर' },
                            { id: 'govt', name: '📜 प्रमाण पत्र' },
                            { id: 'banking', name: '💳 बैंकिंग & बिल' },
                            { id: 'forms', name: '📝 भर्ती फॉर्म' }
                        ].map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeCategory === cat.id ? 'bg-amber-600 text-white shadow' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="सेवा खोजें (Search)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-sm"></i>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredServices.map(service => (
                        <div key={service.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition">
                            <div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 ${service.color}`}>
                                    <i className={`fa-solid ${service.icon}`}></i>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{service.title}</h3>
                                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{service.desc}</p>
                            </div>
                            <button
                                onClick={() => setSelectedService(service)}
                                className="w-full bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 font-semibold py-2 rounded-lg text-sm transition flex items-center justify-center gap-2 border border-slate-200"
                            >
                                <i className="fa-solid fa-file-lines"></i> दस्तावेज़ (Docs) देखें
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Address & Google Maps Link Section */}
            <section id="contact" className="bg-slate-100 py-12 px-4 border-t border-slate-200">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-location-dot text-amber-600"></i> सेंटर का पता एवं संपर्क
                        </h3>
                        <div className="space-y-4 text-sm text-slate-700">
                            <p className="flex items-start gap-3">
                                <i className="fa-solid fa-map-pin text-amber-600 mt-1"></i>
                                <span><strong>पता:</strong> {address}</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <i className="fa-solid fa-phone text-amber-600"></i>
                                <span><strong>फ़ोन:</strong> <a href={`tel:${phone}`} className="text-amber-700 font-bold hover:underline">+91 96160 47120</a></span>
                            </p>
                            <p className="flex items-center gap-3">
                                <i className="fa-solid fa-clock text-amber-600"></i>
                                <span><strong>समय:</strong> {timing}</span>
                            </p>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <a href={`tel:${phone}`} className="flex-1 bg-amber-600 text-white font-bold py-2.5 rounded-lg text-center text-sm shadow hover:bg-amber-500 transition">
                                <i className="fa-solid fa-phone mr-1"></i> कॉल करें
                            </a>
                            <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" className="flex-1 bg-emerald-600 text-white font-bold py-2.5 rounded-lg text-center text-sm shadow hover:bg-emerald-500 transition">
                                <i className="fa-brands fa-whatsapp mr-1"></i> व्हाट्सएप करें
                            </a>
                        </div>
                    </div>

                    <div className="bg-slate-200 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-6 text-center border border-slate-300">
                        <div>
                            <i className="fa-solid fa-map-location-dot text-5xl text-amber-600 mb-3"></i>
                            <h4 className="font-bold text-slate-800 text-lg">आर्यन ऑनलाइन फार्म सेंटर</h4>
                            <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">मड़ियापार, अतरौलिया - अहिराउला मार्ग, उत्तर प्रदेश</p>
                            <a 
                                href={mapUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-4 inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-slate-800 transition shadow"
                            >
                                <i className="fa-solid fa-location-arrow text-amber-400"></i> गूगल मैप्स पर रास्ता देखें
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 text-xs py-6 px-4 text-center border-t border-slate-800">
                <p>© 2026 आर्यन ऑनलाइन फार्म सेंटर (Aryan Online Farmcenter). सर्वाधिकार सुरक्षित।</p>
            </footer>

            {/* Modal for Documents */}
            {selectedService && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                        <button 
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold"
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <i className={`fa-solid ${selectedService.icon} text-amber-600`}></i> {selectedService.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">आवश्यक दस्तावेज़ लाएं या व्हाट्सएप करें:</p>
                        <ul className="space-y-2 mb-6">
                            {selectedService.docs.map((doc, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                                    <i className="fa-solid fa-check text-emerald-600 font-bold"></i> {doc}
                                </li>
                            ))}
                        </ul>
                        <a 
                            href={`https://wa.me/${phone}?text=${encodeURIComponent(`नमस्ते, मुझे ${selectedService.title} करवाना है।`)}`} 
                            target="_blank"
                            rel="noreferrer"
                            className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-center text-sm shadow hover:bg-emerald-500 transition block"
                        >
                            <i className="fa-brands fa-whatsapp mr-1"></i> व्हाट्सएप पर डॉक्यूमेंट्स भेजें
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AryanFarmCenterGold;