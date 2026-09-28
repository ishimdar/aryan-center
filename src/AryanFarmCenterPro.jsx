import React, { useState, useEffect, useRef, useCallback } from 'react';

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================
const STORE_KEYS = {
    VACANCIES: 'aryan_vacancies',
    FAVORITES: 'aryan_favs',
};

const CONTACT_INFO = {
    phoneDisplay: '+91 96160 47120',
    phoneRaw: '919616047120',
    address: 'Madiapar, Atraulia - Ahiraula Road, Near Post Office, UP 223223',
    timing: 'Mon - Sun: 8:00 AM – 8:00 PM',
    mapUrl: 'https://maps.app.goo.gl/GnhGyiSG7vvgiZox9',
};

const DEFAULT_VACANCIES = [
    { id: 101, title: "UP Police Constable Bharti 2026", totalPosts: "60,244 पद", lastDate: "15 मार्च 2026", qualification: "10th / 12th पास", status: "New", fee: "₹400 + CSC Charge" },
    { id: 102, title: "Railway RPF Constable & SI", totalPosts: "4,660 पद", lastDate: "28 मार्च 2026", qualification: "10th / Graduate", status: "Hot", fee: "₹500 (Refundable)" },
    { id: 103, title: "SSC CHSL (10+2) Online Form", totalPosts: "3,712 पद", lastDate: "05 अप्रैल 2026", qualification: "12th Pass", status: "New", fee: "₹100 (Gen/OBC)" },
    { id: 104, title: "UP Scholarship Correction Window", totalPosts: "सभी छात्र", lastDate: "20 मार्च 2026", qualification: "9th, 10th, 12th, BA", status: "Urgent", fee: "₹50 - ₹100" }
];

const SERVICES_DATA = [
    { id: 1, category: 'farmer', title: 'PM-Kisan e-KYC', icon: 'fa-wheat-awn', color: 'bg-emerald-100 text-emerald-700', desc: 'पीएम किसान सम्मान निधि ई-केवाईसी और नया रजिस्ट्रेशन करवाएं।', fee: '₹50 - ₹100', time: '10 मिनट', docs: ['आधार कार्ड', 'बैंक पासबुक', 'खतौनी / ज़मीन के दस्तावेज़', 'मोबाइल नंबर'] },
    { id: 2, category: 'govt', title: 'आय / जाति / निवास प्रमाण पत्र', icon: 'fa-file-contract', color: 'bg-blue-100 text-blue-700', desc: 'उत्तर प्रदेश शासन द्वारा अधिकृत 3-7 दिनों में डिजिटल प्रमाण पत्र।', fee: '₹120 (सरकारी शुल्क सहित)', time: '3-7 कार्य दिवस', docs: ['आधार कार्ड', 'स्वप्रमाणित घोषणा पत्र', 'फोटो', 'पुराना प्रमाण पत्र (यदि हो)'] },
    { id: 3, category: 'banking', title: 'आधार से नकद निकासी (AEPS)', icon: 'fa-piggy-bank', color: 'bg-amber-100 text-amber-700', desc: 'किसी भी बैंक खाते से अंगूठा लगाकर तुरंत नकद निकालें व बैलेंस जांचें।', fee: 'निःशुल्क (Free)', time: 'तुरंत (Instant)', docs: ['आधार कार्ड', 'बैंक में लिंक मोबाइल'] },
    { id: 4, category: 'id', title: 'आयुष्मान भारत कार्ड', icon: 'fa-heart-pulse', color: 'bg-rose-100 text-rose-700', desc: '₹5 लाख तक का मुफ्त इलाज कार्ड तुरंत बनवाएं व प्रिंट लें।', fee: '₹50 (प्रिंट शुल्क)', time: '15 मिनट', docs: ['राशन कार्ड / नाम सूची', 'आधार कार्ड', 'मोबाइल नंबर'] },
    { id: 5, category: 'forms', title: 'सरकारी नौकरी ऑनलाइन फॉर्म', icon: 'fa-user-graduate', color: 'bg-purple-100 text-purple-700', desc: 'SSC, UP Police, Railway, TET, Army और सभी भर्ती फॉर्म सटीक भरवाएं।', fee: '₹50 - ₹150 (फॉर्म अनुसार)', time: '20 मिनट', docs: ['10th/12th/Graduation मार्कशीट', 'फोटो व सिग्नेचर', 'आधार कार्ड', 'जाति प्रमाण पत्र'] },
    { id: 6, category: 'farmer', title: 'खतौनी / भूलेख नकल', icon: 'fa-map-location-dot', color: 'bg-green-100 text-green-700', desc: 'अपनी ज़मीन का खसरा-खतौनी नक्शा तुरंत देखें और प्रमाणित प्रिंट प्राप्त करें।', fee: '₹30 - ₹50', time: '5 मिनट', docs: ['गाटा संख्या / खाता संख्या या नाम'] },
    { id: 7, category: 'id', title: 'नया PAN Card / करेक्शन', icon: 'fa-indigo-100 text-indigo-700', desc: '10 मिनट में इंस्टेंट ई-पैन कार्ड या 7 दिनों में फिजिकल पैन कार्ड प्राप्त करें।', fee: '₹200 - ₹250', time: '7-10 दिन', docs: ['आधार कार्ड', '2 पासपोर्ट साइज फोटो', 'मोबाइल नंबर'] },
    { id: 8, category: 'banking', title: 'बिजली बिल व रिचार्ज', icon: 'fa-bolt', color: 'bg-yellow-100 text-yellow-700', desc: 'यूपीपीसीएल (UPPCL) बिजली बिल भुगतान, रसीद व मोबाइल/DTH रिचार्ज।', fee: 'निःशुल्क', time: 'तुरंत (Instant)', docs: ['बिजली कनेक्शन नंबर / पुराना बिल'] }
];

// Helper to Safely Trigger WhatsApp Links
const openWhatsApp = (message) => {
    const url = `https://api.whatsapp.com/send?phone=${CONTACT_INFO.phoneRaw}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const AryanFarmCenterPro = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [isListening, setIsListening] = useState(false);

    // Smart WhatsApp Lead Pre-fill Modal State
    const [selectedJobForLead, setSelectedJobForLead] = useState(null);
    const [leadData, setLeadData] = useState({ name: '', qualification: '12th Pass', category: 'OBC' });

    // Admin & Sync States
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminPin, setAdminPin] = useState('');
    const [showPinModal, setShowPinModal] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // Form States
    const [callbackData, setCallbackData] = useState({ name: '', phone: '', service: 'सरकारी फॉर्म (Job Form)' });
    const [subPhone, setSubPhone] = useState('');
    const [subName, setSubName] = useState('');

    // Admin Job Management States
    const [editingJobId, setEditingJobId] = useState(null);
    const [jobForm, setJobForm] = useState({
        title: '',
        totalPosts: '',
        lastDate: '',
        qualification: '',
        status: 'New',
        fee: '₹100 + CSC Charge'
    });

    // Favorites LocalStorage Initialization
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem(STORE_KEYS.FAVORITES);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Vacancies State with LocalStorage Persistence
    const [vacancies, setVacancies] = useState(() => {
        try {
            const saved = localStorage.getItem(STORE_KEYS.VACANCIES);
            return saved ? JSON.parse(saved) : DEFAULT_VACANCIES;
        } catch {
            return DEFAULT_VACANCIES;
        }
    });

    // Sync to LocalStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORE_KEYS.VACANCIES, JSON.stringify(vacancies));
        } catch (e) {
            console.error('LocalStorage Write Error [Vacancies]:', e);
        }
    }, [vacancies]);

    useEffect(() => {
        try {
            localStorage.setItem(STORE_KEYS.FAVORITES, JSON.stringify(favorites));
        } catch (e) {
            console.error('LocalStorage Write Error [Favorites]:', e);
        }
    }, [favorites]);

    // Handle ESC Key to Close Modals
    const closeModal = useCallback(() => {
        setShowPinModal(false);
        setSelectedService(null);
        setSelectedJobForLead(null);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeModal]);

    // Speech Recognition
    const recognitionRef = useRef(null);
    const handleVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('आपके ब्राउज़र में वॉइस सर्च सपोर्टेड नहीं है।');
            return;
        }

        if (isListening) {
            if (recognitionRef.current) recognitionRef.current.stop();
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'hi-IN';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            setSearchQuery(event.results[0][0].transcript);
            setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    // Real Live Feed Sync (Connects to backend Scraper API if available)
    const triggerLiveSync = async () => {
        setIsSyncing(true);
        try {
            // Live Node.js API call attempt
            const response = await fetch('http://localhost:5000/api/live-jobs');
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.vacancies.length > 0) {
                    setVacancies(data.vacancies);
                    alert("लाइव जॉब्स सफलतापूर्वक अपडेट हो गए!");
                    setIsSyncing(false);
                    return;
                }
            }
            
            // Fallback mock payload if backend server is offline
            setTimeout(() => {
                const mockFeed = { 
                    id: Date.now(), 
                    title: "UPSSSC Lekhpal Recruitment 2026", 
                    totalPosts: "7,800 पद", 
                    lastDate: "30 मार्च 2026", 
                    qualification: "12th + PET 2025", 
                    status: "New", 
                    fee: "₹25 + CSC Charge" 
                };

                setVacancies(prev => {
                    const exists = prev.some(item => item.title === mockFeed.title);
                    return exists ? prev : [mockFeed, ...prev];
                });
                setIsSyncing(false);
            }, 800);
        } catch (error) {
            console.error("Backend Scraper API offline, using cached/mock feed.", error);
            setIsSyncing(false);
        }
    };

    // Category Counters
    const categories = [
        { id: 'all', name: 'सभी सेवाएँ', count: SERVICES_DATA.length },
        { id: 'fav', name: '⭐ पसंदीदा', count: favorites.length },
        { id: 'farmer', name: '🌾 किसान कॉर्नर', count: SERVICES_DATA.filter(s => s.category === 'farmer').length },
        { id: 'govt', name: '📜 प्रमाण पत्र', count: SERVICES_DATA.filter(s => s.category === 'govt').length },
        { id: 'banking', name: '💳 बैंकिंग & बिल', count: SERVICES_DATA.filter(s => s.category === 'banking').length },
        { id: 'forms', name: '📝 भर्ती फॉर्म', count: SERVICES_DATA.filter(s => s.category === 'forms').length }
    ];

    // Category Click Handler with Smooth Scroll
    const handleCategoryClick = (catId) => {
        setActiveCategory(catId);
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Admin Handlers
    const handleAdminToggle = (e) => {
        e.preventDefault();
        if (isAdmin) {
            setIsAdmin(false);
            setEditingJobId(null);
            alert("Admin mode logged out.");
        } else {
            setShowPinModal(true);
        }
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (['1234', '9616'].includes(adminPin.trim())) {
            setIsAdmin(true);
            setShowPinModal(false);
            setAdminPin('');
        } else {
            alert('गलत पिन! (Demo PIN: 1234)');
        }
    };

    const handleSaveJob = (e) => {
        e.preventDefault();
        if (!jobForm.title || !jobForm.lastDate) {
            alert("कृपया भर्ती का नाम और अंतिम तिथि भरें।");
            return;
        }

        if (editingJobId) {
            setVacancies(prev => prev.map(v => v.id === editingJobId ? { ...jobForm, id: editingJobId } : v));
            setEditingJobId(null);
        } else {
            setVacancies(prev => [{ ...jobForm, id: Date.now() }, ...prev]);
        }

        setJobForm({ title: '', totalPosts: '', lastDate: '', qualification: '', status: 'New', fee: '₹100 + CSC Charge' });
    };

    const handleEditJob = (job) => {
        setEditingJobId(job.id);
        setJobForm(job);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteVacancy = (id) => {
        if (window.confirm('क्या आप इस भर्ती को हटाना चाहते हैं?')) {
            setVacancies(prev => prev.filter(v => v.id !== id));
        }
    };

    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
    };

    // Submissions
    const handleJobSubscribe = (e) => {
        e.preventDefault();
        openWhatsApp(`👋 *Job Alert Subscription*\n\nनाम: ${subName}\nमोबाइल: ${subPhone}\n\nकृपया मुझे नई सरकारी नौकरियों की जानकारी व्हाट्सएप पर भेजें।`);
        setSubName('');
        setSubPhone('');
    };

    const handleCallbackSubmit = (e) => {
        e.preventDefault();
        openWhatsApp(`👋 *नया Call Back Request!*\n\n👤 *नाम:* ${callbackData.name}\n📞 *फोन:* ${callbackData.phone}\n📋 *सेवा:* ${callbackData.service}`);
    };

    const handleSendSmartLead = (e) => {
        e.preventDefault();
        if (!selectedJobForLead) return;
        const msg = `👋 *New Job Application Request*\n\n📋 *Job:* ${selectedJobForLead.title}\n👤 *Name:* ${leadData.name}\n🎓 *Qualification:* ${leadData.qualification}\n🏷️ *Category:* ${leadData.category}\n\nKripya mujhe aage ka form filling process batayein.`;
        openWhatsApp(msg);
        setSelectedJobForLead(null);
        setLeadData({ name: '', qualification: '12th Pass', category: 'OBC' });
    };

    // Filter Logic
    const filteredServices = SERVICES_DATA.filter(s => {
        const matchesCat = activeCategory === 'all' ? true : activeCategory === 'fav' ? favorites.includes(s.id) : s.category === activeCategory;
        const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans pb-16 md:pb-0">
            {/* Top Bar */}
            <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                        <span className="flex items-center gap-1.5"><i className="fa-solid fa-clock text-amber-400"></i> {CONTACT_INFO.timing}</span>
                        <span className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-amber-400"></i> Madiapar, Uttar Pradesh</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleAdminToggle} 
                            type="button"
                            className={`text-xs px-3 py-1.5 rounded font-bold transition flex items-center gap-1 cursor-pointer shadow-sm ${isAdmin ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-amber-500 text-slate-900 hover:bg-amber-400'}`}
                        >
                            <i className="fa-solid fa-user-gear"></i> {isAdmin ? 'मालिक मोड बंद करें' : 'मालिक मोड (Admin)'}
                        </button>
                        <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-amber-400 transition flex items-center gap-1">
                            <i className="fa-solid fa-phone"></i> {CONTACT_INFO.phoneDisplay}
                        </a>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-lg font-bold border-2 border-amber-600 shadow">
                            <i className="fa-solid fa-wheat-awn"></i>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 leading-tight">आर्यन ऑनलाइन फार्म सेंटर</h1>
                            <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider">Aryan Online Farmcenter • Digital Seva CSC</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 font-medium text-slate-700 text-sm">
                        <a href="#home" className="hover:text-amber-600 transition">होम</a>
                        <a href="#vacancies" className="hover:text-amber-600 transition text-amber-600 font-bold flex items-center gap-1">
                            <span>🔥 नई भर्तियाँ</span>
                        </a>
                        <a href="#services" className="hover:text-amber-600 transition">सेवाएँ</a>
                        <a href="#callback" className="hover:text-amber-600 transition">कॉल बैक</a>
                    </nav>
                </div>
            </header>

            {/* Admin Add/Edit Vacancy Form Panel */}
            {isAdmin && (
                <div className="bg-slate-900 text-white p-6 border-b-4 border-amber-500">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                                <i className="fa-solid fa-pen-to-square"></i> {editingJobId ? 'भर्ती संपादित करें (Edit Job)' : 'नई वैकेंसी / भर्ती जोड़ें'}
                            </h3>
                            <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded border border-amber-500/40">
                                🔒 Admin Mode Active
                            </span>
                        </div>
                        <form onSubmit={handleSaveJob} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            <input
                                type="text"
                                placeholder="भर्ती का नाम"
                                value={jobForm.title}
                                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                required
                                className="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded text-xs outline-none focus:border-amber-500"
                            />
                            <input
                                type="text"
                                placeholder="कुल पद"
                                value={jobForm.totalPosts}
                                onChange={(e) => setJobForm({ ...jobForm, totalPosts: e.target.value })}
                                required
                                className="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded text-xs outline-none focus:border-amber-500"
                            />
                            <input
                                type="text"
                                placeholder="योग्यता"
                                value={jobForm.qualification}
                                onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })}
                                required
                                className="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded text-xs outline-none focus:border-amber-500"
                            />
                            <input
                                type="text"
                                placeholder="अंतिम तिथि"
                                value={jobForm.lastDate}
                                onChange={(e) => setJobForm({ ...jobForm, lastDate: e.target.value })}
                                required
                                className="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded text-xs outline-none focus:border-amber-500"
                            />
                            <select
                                value={jobForm.status}
                                onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                                className="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded text-xs outline-none focus:border-amber-500"
                            >
                                <option value="New">New</option>
                                <option value="Hot">Hot</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                            <div className="flex gap-1">
                                <button
                                    type="submit"
                                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-3 py-2 rounded text-xs transition shadow cursor-pointer"
                                >
                                    {editingJobId ? 'अपडेट करें' : '+ पोस्ट करें'}
                                </button>
                                {editingJobId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingJobId(null);
                                            setJobForm({ title: '', totalPosts: '', lastDate: '', qualification: '', status: 'New', fee: '₹100 + CSC Charge' });
                                        }}
                                        className="bg-slate-700 hover:bg-slate-600 text-white px-2 py-2 rounded text-xs transition"
                                    >
                                        रद्द
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section id="home" className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest inline-block mb-4">
                            अधिकृत CSC व डिजिटल सेवा केंद्र
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                            आपकी हर डिजिटल और <span className="text-amber-400">सरकारी सेवा</span> का भरोसेमंद केंद्र
                        </h2>
                        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                            PM-Kisan, आय-जाति-निवास प्रमाण पत्र, आधार बैंकिंग, पैन कार्ड और सभी सरकारी ऑनलाइन फॉर्म अब आसानी से करवाएं।
                        </p>

                        {/* Search Bar */}
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 mb-6 max-w-lg">
                            <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 text-slate-800 shadow-inner">
                                <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
                                <input
                                    type="text"
                                    aria-label="सेवा या फॉर्म खोजें"
                                    placeholder="सेवा या फॉर्म खोजें (उदा. आय प्रमाण पत्र, PM Kisan)..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full text-xs sm:text-sm outline-none bg-transparent"
                                />
                                <button
                                    onClick={handleVoiceSearch}
                                    title="बोलकर खोजें"
                                    type="button"
                                    className={`p-2 rounded-lg text-xs transition cursor-pointer shrink-0 ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 hover:bg-amber-100 text-slate-700'}`}
                                >
                                    <i className="fa-solid fa-microphone text-amber-600"></i>
                                </button>
                            </div>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition cursor-pointer border ${activeCategory === cat.id ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'}`}
                                >
                                    {cat.name} ({cat.count})
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => openWhatsApp("नमस्ते, मुझे फॉर्म भरवाना है।")}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow flex items-center gap-2 text-sm cursor-pointer"
                            >
                                <i className="fa-brands fa-whatsapp text-lg"></i> व्हाट्सएप पर सेवा लें
                            </button>
                            <a href="#vacancies" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-5 py-2.5 rounded-xl shadow flex items-center gap-2 text-sm">
                                <i className="fa-solid fa-briefcase"></i> नई वैकेंसी देखें
                            </a>
                        </div>
                    </div>

                    {/* Features Panel */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-slate-200">
                        <h3 className="text-base font-bold text-amber-400 mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-bolt text-amber-400"></i> त्वरित डिजिटल सेवाएँ
                        </h3>
                        <div className="space-y-3 text-xs">
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                <i className="fa-solid fa-circle-check text-emerald-400 text-base mt-0.5"></i>
                                <div>
                                    <h4 className="font-bold text-white">सरकारी फॉर्म ऑनलाइन पंजीकरण</h4>
                                    <p className="text-slate-400 text-[11px]">बिना गलती के सटीक फॉर्म सबमिशन सुविधा</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                <i className="fa-solid fa-circle-check text-emerald-400 text-base mt-0.5"></i>
                                <div>
                                    <h4 className="font-bold text-white">बैंकिंग व AEPS नकद निकासी</h4>
                                    <p className="text-slate-400 text-[11px]">आधार कार्ड से तुरंत रुपये निकालें</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                <i className="fa-solid fa-circle-check text-emerald-400 text-base mt-0.5"></i>
                                <div>
                                    <h4 className="font-bold text-white">डिजिटल प्रमाण पत्र सेवाएं</h4>
                                    <p className="text-slate-400 text-[11px]">आय, जाति, निवास व आयुष्मान कार्ड</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vacancies Section */}
            <section id="vacancies" className="py-12 bg-slate-100 border-b border-slate-200 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full border border-rose-200 inline-block">
                                    🔥 Live Job Updates Auto-Feed
                                </span>
                                <button 
                                    onClick={triggerLiveSync}
                                    disabled={isSyncing}
                                    className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded flex items-center gap-1 transition cursor-pointer"
                                >
                                    <i className={`fa-solid fa-rotate-right ${isSyncing ? 'animate-spin' : ''}`}></i>
                                    {isSyncing ? 'सिंक हो रहा है...' : 'सिंक करें'}
                                </button>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">नवीनतम सरकारी भर्तियाँ & योजनाएँ</h2>
                            <p className="text-slate-600 text-xs mt-1">घर बैठे अपना फॉर्म भरवाने के लिए WhatsApp पर क्लिक करें</p>
                        </div>

                        <form onSubmit={handleJobSubscribe} className="flex gap-2 w-full md:w-auto bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                            <input
                                type="text"
                                aria-label="आपका नाम"
                                placeholder="आपका नाम"
                                value={subName}
                                onChange={(e) => setSubName(e.target.value)}
                                required
                                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none w-28"
                            />
                            <input
                                type="tel"
                                aria-label="WhatsApp नंबर"
                                pattern="[0-9]{10}"
                                placeholder="WhatsApp नंबर"
                                value={subPhone}
                                onChange={(e) => setSubPhone(e.target.value)}
                                required
                                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none w-32"
                            />
                            <button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition shrink-0 cursor-pointer"
                            >
                                <i className="fa-brands fa-whatsapp text-sm"></i> अलर्ट पाएँ
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {vacancies.map((job) => (
                            <div key={job.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${job.status === 'New' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                            {job.status}
                                        </span>
                                        {isAdmin && (
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => handleEditJob(job)}
                                                    className="text-slate-400 hover:text-amber-600 text-xs transition cursor-pointer"
                                                    title="Edit Post"
                                                >
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteVacancy(job.id)}
                                                    className="text-slate-400 hover:text-rose-600 text-xs transition cursor-pointer"
                                                    title="Delete Post"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm text-slate-900 mb-2">{job.title}</h3>
                                    
                                    <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                                        <p className="flex justify-between"><span>कुल पद:</span><strong className="text-slate-800">{job.totalPosts}</strong></p>
                                        <p className="flex justify-between"><span>योग्यता:</span><strong className="text-slate-800">{job.qualification}</strong></p>
                                        <p className="flex justify-between"><span>अंतिम तिथि:</span><strong className="text-rose-600">{job.lastDate}</strong></p>
                                        <p className="flex justify-between"><span>शुल्क:</span><strong className="text-emerald-700">{job.fee}</strong></p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedJobForLead(job)}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                                >
                                    <i className="fa-brands fa-whatsapp text-emerald-400 text-sm"></i> फॉर्म भरवाएं
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-12 max-w-7xl mx-auto px-4 flex-grow w-full scroll-mt-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">हमारी प्रमुख सेवाएँ (Services)</h2>
                    <p className="text-slate-600 text-xs mt-1">आवश्यक डॉक्यूमेंट्स व शुल्क देखें</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between hover:shadow-lg transition relative">
                                <button
                                    onClick={(e) => toggleFavorite(service.id, e)}
                                    aria-label="Mark as favorite"
                                    className="absolute top-4 right-4 text-slate-300 hover:text-amber-500 transition text-lg cursor-pointer"
                                >
                                    <i className={`fa-solid fa-star ${favorites.includes(service.id) ? 'text-amber-400' : ''}`}></i>
                                </button>
                                <div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${service.color}`}>
                                        <i className={`fa-solid ${service.icon}`}></i>
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900 mb-2 pr-6">{service.title}</h3>
                                    <p className="text-slate-600 text-xs mb-4 leading-relaxed">{service.desc}</p>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                                        <span>⏱️ {service.time}</span>
                                        <span className="font-semibold text-slate-700">💰 {service.fee}</span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedService(service)}
                                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded-lg text-xs transition cursor-pointer"
                                    >
                                        <i className="fa-solid fa-file-lines text-amber-600"></i> दस्तावेज़ देखें
                                    </button>
                                    <button
                                        onClick={() => openWhatsApp(`नमस्ते, मुझे ${service.title} के बारे में जानकारी चाहिए।`)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                    >
                                        <i className="fa-brands fa-whatsapp text-sm"></i> आवेदन करें
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200">
                            इस श्रेणी में कोई सेवा उपलब्ध नहीं है।
                        </div>
                    )}
                </div>
            </section>

            {/* Call Back Section */}
            <section id="callback" className="py-12 bg-amber-50 border-y border-amber-200/60 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100">
                    <div className="text-center mb-6">
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 inline-block mb-2">
                            📞 सहायता केंद्र
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">कॉल बैक (Call Back) का अनुरोध करें</h3>
                        <p className="text-xs text-slate-600 mt-1">अपना नाम और नंबर लिखें, हमारी टीम आपसे तुरंत संपर्क करेगी</p>
                    </div>
                    <form onSubmit={handleCallbackSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                            type="text"
                            aria-label="आपका नाम"
                            placeholder="आपका नाम"
                            value={callbackData.name}
                            onChange={(e) => setCallbackData({ ...callbackData, name: e.target.value })}
                            required
                            className="bg-slate-50 border border-slate-300 px-3 py-2.5 rounded-xl text-xs outline-none focus:border-amber-500"
                        />
                        <input
                            type="tel"
                            aria-label="मोबाइल नंबर"
                            pattern="[0-9]{10}"
                            placeholder="मोबाइल नंबर"
                            value={callbackData.phone}
                            onChange={(e) => setCallbackData({ ...callbackData, phone: e.target.value })}
                            required
                            className="bg-slate-50 border border-slate-300 px-3 py-2.5 rounded-xl text-xs outline-none focus:border-amber-500"
                        />
                        <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow cursor-pointer"
                        >
                            अनुरोध भेजें
                        </button>
                    </form>
                </div>
            </section>

            {/* Contact & Map Section */}
            <section id="contact" className="bg-slate-100 py-12 px-4 border-t border-slate-200">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-location-dot text-amber-600"></i> सेंटर का पता एवं संपर्क
                        </h3>
                        <p className="text-xs text-slate-700 mb-2"><strong>पता:</strong> {CONTACT_INFO.address}</p>
                        <p className="text-xs text-slate-700 mb-2"><strong>फ़ोन:</strong> {CONTACT_INFO.phoneDisplay}</p>
                        <p className="text-xs text-slate-700"><strong>समय:</strong> {CONTACT_INFO.timing}</p>
                    </div>

                    <div className="bg-slate-200 rounded-2xl p-6 text-center border border-slate-300 flex flex-col items-center justify-center">
                        <i className="fa-solid fa-map-location-dot text-4xl text-amber-600 mb-2"></i>
                        <h4 className="font-bold text-slate-800 text-sm">आर्यन ऑनलाइन फार्म सेंटर</h4>
                        <a 
                            href={CONTACT_INFO.mapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                        >
                            <i className="fa-solid fa-location-arrow text-amber-400"></i> गूगल मैप्स पर देखें
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 text-xs py-6 px-4 text-center">
                <p>© 2026 आर्यन ऑनलाइन फार्म सेंटर. सर्वाधिकार सुरक्षित।</p>
            </footer>

            {/* PO Feature: Smart WhatsApp Lead Generator Modal */}
            {selectedJobForLead && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setSelectedJobForLead(null)}
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 relative cursor-default"
                    >
                        <button 
                            onClick={() => setSelectedJobForLead(null)} 
                            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 font-bold text-sm"
                        >
                            ✕
                        </button>
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
                            <i className="fa-brands fa-whatsapp"></i>
                        </div>
                        <h3 className="font-bold text-base text-center mb-1 text-slate-900">फॉर्म विवरण दर्ज करें</h3>
                        <p className="text-xs text-center text-slate-500 mb-4">{selectedJobForLead.title}</p>
                        
                        <form onSubmit={handleSendSmartLead} className="space-y-3 text-xs">
                            <div>
                                <label className="block text-slate-700 font-semibold mb-1">आपका नाम:</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="उदा. राहुल कुमार"
                                    value={leadData.name}
                                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-semibold mb-1">योग्यता (Qualification):</label>
                                <select
                                    value={leadData.qualification}
                                    onChange={(e) => setLeadData({ ...leadData, qualification: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 bg-white"
                                >
                                    <option value="10th Pass">10th Pass</option>
                                    <option value="12th Pass">12th Pass</option>
                                    <option value="Graduate">Graduate</option>
                                    <option value="Post Graduate">Post Graduate</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-700 font-semibold mb-1">कैटेगरी (Category):</label>
                                <select
                                    value={leadData.category}
                                    onChange={(e) => setLeadData({ ...leadData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-emerald-500 bg-white"
                                >
                                    <option value="General">General</option>
                                    <option value="OBC">OBC</option>
                                    <option value="SC/ST">SC/ST</option>
                                    <option value="EWS">EWS</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow mt-2"
                            >
                                <i className="fa-brands fa-whatsapp text-sm"></i> WhatsApp पर भेजें
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Admin PIN Modal */}
            {showPinModal && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-pin-title"
                    onClick={() => setShowPinModal(false)}
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="bg-white p-6 rounded-2xl max-w-xs w-full text-center shadow-2xl border border-slate-100 relative cursor-default"
                    >
                        <button 
                            onClick={() => setShowPinModal(false)} 
                            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 font-bold text-sm"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <h3 id="modal-pin-title" className="font-bold text-lg mb-1 text-slate-900">Admin PIN दर्ज करें</h3>
                        <p className="text-xs text-slate-500 mb-4">मालिक मोड के लिए 4-अंकों का PIN दर्ज करें (PIN: <strong>1234</strong>)</p>
                        <form onSubmit={handleAdminLogin} className="space-y-3">
                            <input
                                type="password"
                                maxLength="4"
                                autoFocus
                                aria-label="4 digit PIN"
                                value={adminPin}
                                onChange={(e) => setAdminPin(e.target.value)}
                                placeholder="1 2 3 4"
                                required
                                className="w-full text-center tracking-widest text-xl font-bold py-2.5 border-2 border-slate-300 rounded-xl focus:border-amber-500 focus:outline-none"
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer">
                                    Login
                                </button>
                                <button type="button" onClick={() => setShowPinModal(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold transition cursor-pointer">
                                    रद्द करें
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Documents Modal */}
            {selectedService && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-doc-title"
                    onClick={() => setSelectedService(null)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative cursor-default"
                    >
                        <button onClick={() => setSelectedService(null)} aria-label="Close modal" className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
                        <h3 id="modal-doc-title" className="text-lg font-bold text-slate-900 mb-1">{selectedService.title}</h3>
                        <p className="text-xs font-bold text-slate-700 mt-4 mb-2">आवश्यक दस्तावेज़:</p>
                        <ul className="space-y-2 mb-6">
                            {selectedService.docs.map((doc, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                                    <i className="fa-solid fa-circle-check text-emerald-600"></i> {doc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AryanFarmCenterPro;