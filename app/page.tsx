'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  const testimonials = [
    {
      stars: 5,
      text: '\u201cLlevo a mi perrito Max desde hace 3 años. La atención es increíble, explican todo al detalle y se nota el amor por los animales.\u201d',
      avatar: 'https://i.pravatar.cc/150?img=32',
      name: 'María González',
      role: 'Dueña de Max (Golden)',
    },
    {
      stars: 5,
      text: '\u201cSalvaron a mi gata Luna de una emergencia un domingo por la madrugada. Muy profesionales y empáticos. Eternamente agradecido.\u201d',
      avatar: 'https://i.pravatar.cc/150?img=11',
      name: 'Carlos Rodríguez',
      role: 'Dueño de Luna (Siamés)',
    },
    {
      stars: 4,
      text: '\u201cMe encanta el servicio de peluquería. Dejan a mi caniche hermoso y él no se estresa para nada al ir. Súper recomendado.\u201d',
      avatar: 'https://i.pravatar.cc/150?img=44',
      name: 'Laura Martínez',
      role: 'Dueña de Toby (Caniche)',
    },
    {
      stars: 5,
      text: '\u201cExcelentes profesionales. Mi perro siempre entra moviendo la cola, cosa que nunca pasaba en otras veterinarias. Súper recomendados.\u201d',
      avatar: 'https://i.pravatar.cc/150?img=59',
      name: 'Juan Pérez',
      role: 'Dueño de Rocky (Bulldog)',
    },
  ]
  useEffect(() => {
    // 1. Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    )

    revealElements.forEach((el) => revealObserver.observe(el))

    // 2. Contadores Numéricos (Estadísticas)
    const statsContainer = document.getElementById('stats-container')
    const counters = document.querySelectorAll('.counter')
    let hasCounted = false

    const runCounters = () => {
      counters.forEach((counter) => {
        const target = +(counter.getAttribute('data-target') || 0)
        const duration = 2000 // ms
        const frameDuration = 1000 / 60 // 60fps
        const totalFrames = Math.round(duration / frameDuration)
        const easeOutQuart = (t: number) => 1 - --t * t * t * t

        let frame = 0
        const count = setInterval(() => {
          frame++
          const progress = easeOutQuart(frame / totalFrames)
          const current = Math.round(target * progress)

          if (frame === totalFrames) {
            counter.innerHTML = target.toString()
            clearInterval(count)
          } else {
            counter.innerHTML = current.toString()
          }
        }, frameDuration)
      })
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasCounted) {
          runCounters()
          hasCounted = true
          statsObserver.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (statsContainer) statsObserver.observe(statsContainer)

    return () => {
      revealObserver.disconnect()
      statsObserver.disconnect()
    }
  }, [])

  return (
    <div className="bg-white text-neutral-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Navbar */}
      <div className="fixed top-4 left-0 w-full z-50 px-4 sm:px-6 flex justify-center pointer-events-none">
        <nav className="w-full max-w-7xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-4 h-16 flex items-center justify-between transition-all duration-300 pointer-events-auto reveal is-active">
          <a href="#" className="flex items-center gap-2 ml-2 hover:scale-105 transition-transform duration-300">
            <img src="/petly.png" alt="Petly" className="h-8 w-auto object-contain" />
          </a>

          <div className="hidden lg:flex items-center gap-1 bg-neutral-50/50 p-1.5 rounded-full border border-neutral-200/50 backdrop-blur-sm">
            {[
              { href: '#servicios', label: 'Servicios' },
              { href: '#nosotros', label: 'Nosotros' },
              { href: '#equipo', label: 'Equipo' },
              { href: '#productos', label: 'Tienda' },
              { href: '#planes', label: 'Planes' },
              { href: '#testimonios', label: 'Testimonios' },
              { href: '#faq', label: 'FAQ' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-bold text-neutral-600 hover:text-orange-600 hover:bg-white hover:shadow-sm px-4 py-2 rounded-full transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contacto" className="group relative hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white text-sm font-bold hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Agendar Turno
              </span>
              <Icon icon="mdi:paw" className="absolute -top-3 -right-3 w-6 h-6 transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 rotate-12 drop-shadow-sm pointer-events-none text-sky-300" />
            </a>
            <button
              id="mobile-menu-btn"
              className="lg:hidden text-neutral-700 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              <Icon icon={mobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} width="22" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] z-[70] lg:hidden bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-100">
          <span className="text-lg font-semibold tracking-tighter text-neutral-900">Petly</span>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-colors text-neutral-600"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <Icon icon="solar:close-circle-linear" width="22" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
          {[
            { href: '#servicios', label: 'Servicios', icon: 'solar:heart-pulse-line-duotone' },
            { href: '#nosotros', label: 'Nosotros', icon: 'solar:hospital-line-duotone' },
            { href: '#equipo', label: 'Equipo', icon: 'solar:users-group-two-rounded-line-duotone' },
            { href: '#productos', label: 'Tienda', icon: 'solar:shop-line-duotone' },
            { href: '#planes', label: 'Planes', icon: 'solar:wallet-line-duotone' },
            { href: '#testimonios', label: 'Testimonios', icon: 'solar:star-line-duotone' },
            { href: '#faq', label: 'FAQ', icon: 'solar:question-circle-linear' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm"
            >
              <Icon icon={item.icon} width="20" className="shrink-0 text-orange-400" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-6 pb-8">
          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white text-sm font-semibold shadow-lg shadow-sky-500/25"
          >
            <Icon icon="solar:calendar-add-linear" width="18" />
            Agendar Turno
          </a>
          <p className="text-center text-xs text-neutral-400 mt-4">📍 Av. Libertador 1234, CABA</p>
        </div>
      </div>

      {/* Hero */}
      <section className="relative z-0 pt-32 pb-20 lg:pt-0 overflow-hidden flex items-center min-h-[90vh] lg:min-h-screen">
        <div className="absolute inset-0 w-full h-full -z-20">
          <img src="/hero-pets.png" alt="Mascotas" className="w-full h-full object-cover object-[75%_center]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mb-10 lg:mb-20">
          <div className="max-w-2xl">
            <h1 className="reveal delay-100 text-5xl lg:text-7xl font-semibold tracking-tighter text-neutral-900 leading-[1.1] mb-6">
              Centro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Cuidado Animal</span>
            </h1>
            <p className="reveal delay-200 text-lg text-black font-semibold mb-10 leading-relaxed max-w-lg md:text-neutral-600 md:font-normal">
              Medicina veterinaria de primer nivel combinada con compasión. Ofrecemos cuidado preventivo, diagnóstico y tratamientos avanzados para tus mascotas.
            </p>
            <div className="reveal delay-300 flex flex-col sm:flex-row gap-4">
              <a href="#contacto" className="group relative inline-flex items-center justify-center h-12 px-8 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
                Solicitar cita
                <Icon icon="mdi:paw" className="absolute -top-3 -right-3 w-6 h-6 transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 rotate-12 drop-shadow-sm pointer-events-none text-orange-400" />
              </a>
              <a href="#servicios" className="group relative inline-flex items-center justify-center h-12 px-8 rounded-full bg-white border border-neutral-200 text-neutral-900 text-sm font-medium hover:bg-neutral-50 transition-colors gap-2">
                Ver servicios
                <Icon icon="solar:arrow-right-linear" />
                <Icon icon="mdi:paw" className="absolute -top-3 -right-3 w-6 h-6 transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 rotate-12 drop-shadow-sm pointer-events-none text-orange-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[50px] lg:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.47,189.9,106.2,235.3,95.34,280.9,74.8,321.39,56.44Z" className="fill-neutral-50"></path>
          </svg>
        </div>
      </section>

      {/* Marcas de Confianza */}
      <section className="py-10 bg-neutral-50 overflow-hidden flex flex-col items-center justify-center">
        <p className="text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-6 text-center">Trabajamos con las mejores marcas</p>
        <div className="relative overflow-hidden pause-marquee w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none"></div>
          <div className="flex animate-marquee-track opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Bloque original */}
            <div className="flex gap-16 items-center shrink-0 pr-16">
              <h4 className="text-2xl font-black text-neutral-800">ROYAL CANIN</h4>
              <h4 className="text-2xl font-bold text-neutral-800 tracking-tighter">PRO PLAN</h4>
              <h4 className="text-2xl font-bold text-neutral-800 italic">Eukanuba</h4>
              <h4 className="text-2xl font-black text-neutral-800 tracking-widest">ZOETIS</h4>
              <h4 className="text-2xl font-serif font-bold text-neutral-800">Bravecto</h4>
              <h4 className="text-2xl font-black text-neutral-800">NexGard</h4>
            </div>
            {/* Duplicado para loop infinito */}
            <div className="flex gap-16 items-center shrink-0 pr-16" aria-hidden="true">
              <h4 className="text-2xl font-black text-neutral-800">ROYAL CANIN</h4>
              <h4 className="text-2xl font-bold text-neutral-800 tracking-tighter">PRO PLAN</h4>
              <h4 className="text-2xl font-bold text-neutral-800 italic">Eukanuba</h4>
              <h4 className="text-2xl font-black text-neutral-800 tracking-widest">ZOETIS</h4>
              <h4 className="text-2xl font-serif font-bold text-neutral-800">Bravecto</h4>
              <h4 className="text-2xl font-black text-neutral-800">NexGard</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section id="stats-container" className="bg-neutral-50 pb-20 pt-10 reveal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-50/50 via-transparent to-cyan-50/30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-x divide-sky-100">
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-4xl lg:text-5xl font-semibold tracking-tighter text-sky-500 mb-2">
                +<span className="counter" data-target="2000">0</span>
              </span>
              <span className="text-sm text-neutral-500 font-medium">Pacientes Felices</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-4xl lg:text-5xl font-semibold tracking-tighter text-sky-500 mb-2">
                <span className="counter" data-target="8">0</span>
              </span>
              <span className="text-sm text-neutral-500 font-medium">Años de Experiencia</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-4xl lg:text-5xl font-semibold tracking-tighter text-sky-500 mb-2">
                +<span className="counter" data-target="15">0</span>k
              </span>
              <span className="text-sm text-neutral-500 font-medium">Vacunas Aplicadas</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-4xl lg:text-5xl font-semibold tracking-tighter text-sky-500 mb-2">
                <span className="counter" data-target="98">0</span>%
              </span>
              <span className="text-sm text-neutral-500 font-medium">Satisfacción</span>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Premium / Por qué elegirnos */}
      <section id="servicios" className="py-32 bg-white relative overflow-hidden">
        {/* Glow Effects Decorativos */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-400/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/8 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/50 shadow-sm text-orange-500 text-xs font-semibold uppercase tracking-widest mb-6">
                <Icon icon="solar:star-fall-linear" width="16" />
                <span>Especialidades</span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900 mb-6 leading-tight">
                Cuidado <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 relative">integral
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-200 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg>
                </span> para tu mejor amigo
              </h3>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Instalaciones de primera clase y un equipo humano apasionado para garantizar el bienestar y la salud de tus mascotas en todas las etapas de su vida.
              </p>
            </div>
            <a href="#contacto" className="group hidden lg:inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-neutral-200 hover:border-orange-200 hover:shadow-lg transition-all text-neutral-900 text-sm font-semibold whitespace-nowrap">
              Ver todos los servicios
              <Icon icon="solar:arrow-right-linear" width="18" className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile: tarjetas apiladas con contenido siempre visible */}
          <div className="flex flex-col gap-4 lg:hidden mt-10">
            {[
              { title: "Medicina Preventiva", icon: "solar:heart-pulse-line-duotone", img: "/medicina-preventiva.png", text: "Chequeos de rutina, vacunación y desparasitación para mantener a tu mascota sana y fuerte.", delay: "delay-100" },
              { title: "Especialidades", icon: "solar:stethoscope-line-duotone", img: "/especialidades.png", text: "Diagnósticos precisos, análisis, rayos X y cirugías con equipos de última generación.", delay: "delay-200" },
              { title: "Peluquería y Spa", icon: "solar:bath-line-duotone", img: "/peluquerias-spa.png", text: "Baños medicados, cortes de raza, limpieza dental y cuidados estéticos para su bienestar.", delay: "delay-300" },
              { title: "Planes Mensuales", icon: "solar:wallet-line-duotone", img: "/planes-mensuales.png", text: "Planes de salud personalizados con cuotas fijas para cubrir todas las necesidades anuales.", delay: "delay-400" },
            ].map((s, i) => (
              <a key={i} href="#contacto" className={`reveal ${s.delay} group relative rounded-2xl overflow-hidden isolate flex flex-row items-center gap-4 bg-neutral-50 border border-neutral-100 hover:border-orange-200 transition-colors p-4 cursor-pointer`}>
                {/* Imagen cuadrada a la izquierda */}
                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-amber-500/10"></div>
                </div>
                {/* Icono + texto a la derecha */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                      <Icon icon={s.icon} width="16" />
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 leading-tight">{s.title}</h4>
                  </div>
                  <p className="text-neutral-500 text-xs leading-relaxed">{s.text}</p>
                </div>
                <Icon icon="solar:arrow-right-linear" width="16" className="shrink-0 text-orange-400 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>

          {/* Desktop: accordion horizontal */}
          <div className="hidden lg:flex flex-row gap-4 h-[650px] w-full mt-10">
            {[
              { title: "Medicina Preventiva", icon: "solar:heart-pulse-line-duotone", img: "/medicina-preventiva.png", text: "Chequeos de rutina, vacunación y desparasitación para mantener a tu mascota sana y fuerte.", delay: "delay-100" },
              { title: "Especialidades", icon: "solar:stethoscope-line-duotone", img: "/especialidades.png", text: "Diagnósticos precisos, análisis, rayos X y cirugías con equipos de última generación.", delay: "delay-200" },
              { title: "Peluquería y Spa", icon: "solar:bath-line-duotone", img: "/peluquerias-spa.png", text: "Baños medicados, cortes de raza, limpieza dental y cuidados estéticos para su bienestar.", delay: "delay-300" },
              { title: "Planes Mensuales", icon: "solar:wallet-line-duotone", img: "/planes-mensuales.png", text: "Planes de salud personalizados con cuotas fijas para cubrir todas las necesidades anuales.", delay: "delay-400" },
            ].map((s, i) => (
              <div key={i} className={`reveal ${s.delay} group relative flex-1 hover:flex-[4] transition-all duration-700 ease-in-out cursor-pointer rounded-[2.5rem] overflow-hidden isolate`}>
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-neutral-900/70 group-hover:bg-transparent transition-colors duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-end group-hover:items-center gap-4 mb-2 transition-all duration-500">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-orange-500/90 group-hover:border-orange-500 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-500">
                      <Icon icon={s.icon} width="28" />
                    </div>
                    <div className="w-[150px] group-hover:w-full transition-all duration-700 ease-in-out">
                      <h4 className="text-3xl font-bold text-white drop-shadow-md leading-tight">{s.title}</h4>
                    </div>
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-white/90 text-base leading-relaxed max-w-sm mt-3 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 drop-shadow-sm">{s.text}</p>
                      <a href="#contacto" className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-orange-500/90 backdrop-blur-sm px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 border border-white/20 hover:border-orange-400">
                        Ver detalles <Icon icon="solar:arrow-right-linear" width="16" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Sobre Nosotros */}
<section id="nosotros" className="py-24 bg-neutral-50 relative overflow-hidden">
  {/* Estado del lightbox — agregá esto al componente padre */}
  {/* const [lightboxImg, setLightboxImg] = useState<string | null>(null) */}

  {/* Lightbox overlay */}
  {lightboxImg && (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
      onClick={() => setLightboxImg(null)}
    >
      <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <img
          src={lightboxImg}
          alt="Vista ampliada"
          className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />
        <button
          onClick={() => setLightboxImg(null)}
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-colors"
        >
          <Icon icon="solar:close-circle-bold" width="20" />
        </button>
      </div>
    </div>
  )}

  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-300/10 rounded-full blur-[120px] pointer-events-none"></div>
  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-200/10 rounded-full blur-[100px] pointer-events-none"></div>
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-16 max-w-2xl mx-auto reveal">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/50 shadow-sm text-sky-500 text-xs font-semibold uppercase tracking-widest mb-6">
        <Icon icon="solar:heart-pulse-line-duotone" width="16" />
        <span>Sobre nosotros</span>
      </div>
      <h3 className="text-3xl lg:text-4xl font-semibold tracking-tighter text-neutral-900 mb-4">Conoce nuestro entorno</h3>
      <p className="text-neutral-500 text-lg">Un espacio diseñado especialmente para reducir el estrés y brindar la máxima comodidad a nuestros pacientes de cuatro patas.</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

      {/* Columna izquierda — texto */}
      <div className="reveal delay-100 space-y-8">
        <div>
          <h4 className="text-xl font-bold tracking-tighter text-neutral-900 mb-3">Más de 8 años cuidando lo que más querés</h4>
          <p className="text-neutral-500 leading-relaxed">
            Petly nació en 2016 con una sola convicción: que cada mascota merece atención médica de primer nivel en un ambiente que no genere estrés. Hoy somos un equipo de 4 profesionales comprometidos con el bienestar animal y con las familias que confían en nosotros.
          </p>
        </div>

        <div className="space-y-3">
          {[
            { icon: "solar:heart-bold", title: "Trato compasivo", text: "Cada paciente es único. Nos tomamos el tiempo necesario para entender a tu mascota." },
            { icon: "solar:diploma-bold", title: "Excelencia médica", text: "Equipo en formación continua con los últimos avances en medicina veterinaria." },
            { icon: "solar:shield-check-bold", title: "Transparencia total", text: "Te explicamos cada diagnóstico y procedimiento de forma clara y honesta." },
          ].map((v, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-100 hover:border-sky-100 hover:shadow-sm transition-all duration-300">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                <Icon icon={v.icon} width="20" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 text-sm mb-0.5">{v.title}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{v.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">Nuestras instalaciones</p>
          <div className="flex flex-wrap gap-2">
            {["Quirófano equipado", "Rayos X digital", "Laboratorio propio", "Internación 24hs", "Sala de espera separada", "Área de grooming", "Ecógrafo", "Monitoreo cardíaco"].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-medium">
                <Icon icon="solar:check-circle-bold" width="14" className="text-sky-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Columna derecha — fotos con lightbox */}
      <div className="reveal delay-200 grid grid-cols-2 gap-3 auto-rows-[200px]">
        <div
          className="col-span-2 relative rounded-3xl overflow-hidden group cursor-zoom-in"
          onClick={() => setLightboxImg("/entorno1.png")}
        >
          <img src="/entorno1.png" alt="Instalaciones" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Icon icon="solar:magnifer-zoom-in-bold" width="16" className="text-neutral-700" />
          </div>
        </div>

        <div
          className="relative rounded-3xl overflow-hidden group cursor-zoom-in"
          onClick={() => setLightboxImg("/entorno2.png")}
        >
          <img src="/entorno2.png" alt="Sector de espera" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Icon icon="solar:magnifer-zoom-in-bold" width="16" className="text-neutral-700" />
          </div>
        </div>

        <div
          className="relative rounded-3xl overflow-hidden group cursor-zoom-in"
          onClick={() => setLightboxImg("/entorno3.png")}
        >
          <img src="/entorno3.png" alt="Equipamiento" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Icon icon="solar:magnifer-zoom-in-bold" width="16" className="text-neutral-700" />
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
      {/* Nuestro Equipo Médico */}
      <section id="equipo" className="py-24 bg-white relative overflow-hidden">
        {/* Glow decorativo */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/50 shadow-sm text-orange-500 text-xs font-semibold uppercase tracking-widest mb-6">
                <Icon icon="solar:stethoscope-line-duotone" width="16" />
                <span>Conoce a los expertos</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-semibold tracking-tighter text-neutral-900 mb-4">
                Tu mascota en las <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">mejores manos</span>
              </h3>
              <p className="text-neutral-500 text-lg">Profesionales altamente capacitados y enamorados de su vocación.</p>
            </div>
          </div>

          {/* Grid: 1 col mobile, 2 tablet, 4 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dra. Ana López",
                role: "Directora Médica",
                spec: "Cirugía General",
                exp: "12 años",
                img: "/ana-lopez.png",
                bio: "Especialista en cirugía de tejidos blandos y traumatología. Formada en la UBA con posgrado en España.",
                delay: "delay-100"
              },
              {
                name: "Dr. Martín Silva",
                role: "Veterinario",
                spec: "Cardiología",
                exp: "8 años",
                img: "/martin-silva.png",
                bio: "Cardiólogo veterinario certificado. Especialista en ecocardiografía y arritmias en pequeños animales.",
                delay: "delay-200"
              },
              {
                name: "Dra. Sofía Reyes",
                role: "Veterinaria",
                spec: "Felinomédica",
                exp: "6 años",
                img: "/sofia-reyes.png",
                bio: "Especialista exclusiva en felinos. Formada en medicina del comportamiento y manejo del estrés felino.",
                delay: "delay-300"
              },
              {
                name: "Dr. Tomás Vera",
                role: "Especialista",
                spec: "Animales Exóticos",
                exp: "9 años",
                img: "/tomas-vera.png",
                bio: "Experto en aves, reptiles y pequeños mamíferos. Miembro de la Asociación Latinoamericana de Zoológicos.",
                delay: "delay-400"
              },
            ].map((vet, i) => (
              <div key={i} className={`reveal ${vet.delay} group relative`}>

                {/* Foto + overlays */}
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-neutral-100 mb-4">
                  <img
                    src={vet.img}
                    alt={vet.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay base sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent"></div>

                  {/* Overlay hover con bio */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/60 to-neutral-900/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Badge especialidad — siempre visible */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-orange-600 text-[11px] font-bold shadow-sm border border-orange-100">
                      <Icon icon="solar:medal-star-bold" width="12" />
                      {vet.spec}
                    </span>
                  </div>

                  {/* Matrícula — siempre visible abajo */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white/60 text-[11px] font-medium">{vet.matricula}</span>
                  </div>

                  {/* Contenido hover — bio + linkedin */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                    <p className="text-white/90 text-xs leading-relaxed mb-4">{vet.bio}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-orange-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Icon icon="solar:clock-circle-bold" width="12" className="text-white" />
                        <span className="text-white text-[11px] font-bold">{vet.exp} de exp.</span>
                      </div>
                      <a href="#" className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-orange-500 transition-colors border border-white/30">
                        <Icon icon="mdi:linkedin" width="18" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Info debajo de la foto */}
                <div className="px-1">
                  <h4 className="text-base font-bold text-neutral-900 leading-tight">{vet.name}</h4>
                  <p className="text-orange-500 font-medium text-sm mt-0.5">{vet.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Almacenar - Productos */}
      <section id="productos" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/50 shadow-sm text-orange-500 text-xs font-semibold uppercase tracking-widest mb-6">
              <Icon icon="solar:shop-line-duotone" width="16" />
              <span>Almacenar</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-neutral-900 mb-4">Productos de primera calidad para tu mascota</h3>
            <p className="text-neutral-500 text-lg">Hemos seleccionado los mejores productos del mercado para garantizar la salud, el bienestar y la felicidad de su mascota.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Alimento premium", 
                desc: "Royal Canin, Hill's, Eukanuba y más", 
                badge: "+50 marcas", 
                img: "/pet_food_premium.png",
                icon: "solar:bone-line-duotone",
                delay: "delay-100"
              },
              { 
                title: "Ropa y accesorios", 
                desc: "Collares, arneses, ropa y juguetes", 
                badge: "Más de 200 artículos", 
                img: "/pet_accessories.png",
                icon: "solar:hanger-line-duotone",
                delay: "delay-200"
              },
              { 
                title: "Higiene y cuidado", 
                desc: "Champús, acondicionadores y perfumes", 
                badge: "Natural", 
                img: "/pet_hygiene.png",
                icon: "solar:bath-line-duotone",
                delay: "delay-300"
              },
              { 
                title: "Camas y casitas", 
                desc: "Comodidad y estilo para el descanso de tu mascota.", 
                badge: "Nuevo", 
                img: "/pet_beds.png",
                icon: "solar:home-smile-line-duotone",
                delay: "delay-400"
              },
              { 
                title: "Medicamentos y suplementos", 
                desc: "Desparasitantes, tratamientos y vitaminas.", 
                badge: "Con receta médica", 
                img: "/pet_pharmacy.png",
                icon: "solar:medical-kit-line-duotone",
                delay: "delay-500"
              }
            ].map((prod, i) => (
              <div key={i} className={`reveal ${prod.delay} group relative bg-neutral-50 rounded-[2rem] overflow-hidden border border-neutral-100 hover:border-orange-200 transition-all duration-500 hover:shadow-xl hover:shadow-orange-100`}>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={prod.img} alt={prod.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-orange-600 border border-orange-100 uppercase tracking-wider">{prod.badge}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                    <Icon icon={prod.icon} width="20" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">{prod.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-0">{prod.desc}</p>
                </div>
              </div>
            ))}

            {/* CTA Card */}
<div className="reveal delay-600 flex flex-col justify-center items-center p-8 rounded-[2rem] bg-gradient-to-br from-sky-600 to-cyan-500 text-white text-center shadow-lg shadow-sky-300">
  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
    <Icon icon="solar:chat-round-line-duotone" width="32" />
  </div>
  <h4 className="text-2xl font-bold mb-4">¿Buscas algo específico?</h4>
  <p className="text-white/80 text-sm mb-8">Realiza tu pedido o consulta por WhatsApp. El equipo de Petly te ayudará.</p>
  <a 
    href="https://wa.me/541143218765" 
    target="_blank" 
    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-sky-600 font-bold hover:bg-sky-50 transition-all active:scale-95 shadow-md"
  >
    <img src="https://img.icons8.com/color/96/whatsapp--v1.png" alt="WA" className="w-5 h-5" />
    Haz tu pedido
  </a>
</div>
          </div>
        </div>
      </section>

      {/* Planes Mensuales de Salud */}
      <section id="planes" className="py-32 bg-neutral-900 text-white relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 via-neutral-900 to-neutral-900 pointer-events-none" />
        {/* Huellas decorativas */}
        <svg className="absolute top-10 left-10 text-orange-500/10 pointer-events-none rotate-12" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" />
        </svg>
        <svg className="absolute bottom-10 right-16 text-orange-500/10 pointer-events-none -rotate-20" width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" />
        </svg>
        <svg className="absolute top-1/2 left-1/4 text-white/5 pointer-events-none rotate-45" width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" /></svg>
              Planes de Salud
            </div>
            <h3 className="text-3xl lg:text-5xl font-bold tracking-tighter text-white mb-4">Salud preventiva todo el año</h3>
            <p className="text-neutral-400 text-lg">Cuidado mensual sin sorpresas. Elegí el plan ideal para tu compañero peludo.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">

            {/* Plan Básico */}
            <div className="reveal delay-100 group relative bg-neutral-800/60 backdrop-blur-md border border-neutral-700/50 p-8 rounded-[2rem] hover:border-orange-500/40 hover:bg-neutral-800/80 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/30 transition-all duration-500 ease-out flex flex-col">
              {/* Ícono SVG - Cachorro/Básico */}
              <div className="w-14 h-14 rounded-2xl bg-neutral-700/60 border border-neutral-600/50 flex items-center justify-center mb-5 group-hover:border-orange-500/40 group-hover:bg-orange-500/10 transition-all duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                  <path d="M10 5.5C10 4.1 8.9 3 7.5 3S5 4.1 5 5.5 6.1 8 7.5 8 10 6.9 10 5.5z" />
                  <path d="M19 5.5C19 4.1 17.9 3 16.5 3S14 4.1 14 5.5 15.1 8 16.5 8 19 6.9 19 5.5z" />
                  <path d="M3 9c0 2.5 1.5 4 3 4.5V17c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-3.5C19.5 13 21 11.5 21 9H3z" />
                  <path d="M9 17v-3m6 3v-3" />
                </svg>
              </div>
              {/* Badge animal */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-700/50 text-neutral-400 text-[10px] font-semibold uppercase tracking-wider mb-4 w-fit">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" /></svg>
                Mascotas jóvenes
              </div>
              <h4 className="text-2xl font-bold text-white mb-1">Plan Básico</h4>
              <p className="text-neutral-400 text-sm mb-6">Ideal para cachorros y mascotas sanas en etapa activa.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-xs text-neutral-500 font-medium mt-1">$</span>
                <span className="text-4xl font-extrabold text-white tracking-tight">15.000</span>
                <span className="text-neutral-500 text-sm font-medium">/mes</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-orange-400 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-300">1 Chequeo general anual</span></li>
                <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-orange-400 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-300">Vacunación anual obligatoria</span></li>
                <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-orange-400 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-300">Desparasitación interna trimestral</span></li>
                <li className="flex items-start gap-3"><Icon icon="solar:close-circle-bold" className="text-neutral-600 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-600">Análisis de sangre</span></li>
                <li className="flex items-start gap-3"><Icon icon="solar:close-circle-bold" className="text-neutral-600 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-600">Electrocardiograma</span></li>
              </ul>
              <a href="#contacto" className="animate-btn-pulse inline-flex justify-center w-full py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-orange-500/20 hover:border-orange-500/50 border border-transparent transition-all duration-300">Comenzar con este plan</a>
            </div>

            {/* Plan Integral - Destacado */}
            <div className="reveal delay-200 md:-translate-y-4 relative">
              {/* Badge más popular - FUERA de overflow-hidden */}
              <div className="animate-zoom-in-pulse absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-neutral-900 text-white text-[10px] font-bold px-4 py-1.5 rounded-full border border-orange-400 flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                <Icon icon="solar:star-bold" width="10" className="text-orange-400" />
                MÁS POPULAR
              </div>
              <div className="group relative p-8 rounded-[2rem] flex flex-col overflow-hidden h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/40 transition-all duration-500 ease-out">
                {/* Fondo del plan destacado */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-amber-600 -z-10" />
                <div className="absolute inset-0 opacity-10 -z-10">
                  <svg className="absolute -top-4 -right-4 rotate-12" width="120" height="120" viewBox="0 0 24 24" fill="white"><ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" /></svg>
                </div>
                {/* Ícono SVG - Corazón + Estetoscopio */}
                <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    <line x1="12" y1="9" x2="12" y2="15" /><line x1="9" y1="12" x2="15" y2="12" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white/80 text-[10px] font-semibold uppercase tracking-wider mb-4 w-fit">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" /></svg>
                  Perros y gatos
                </div>
                <h4 className="text-2xl font-bold text-white mb-1">Plan Integral</h4>
                <p className="text-orange-100 text-sm mb-6">Cuidado completo para total tranquilidad durante todo el año.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-xs text-orange-200 font-medium mt-1">$</span>
                  <span className="text-4xl font-extrabold text-white tracking-tight">28.000</span>
                  <span className="text-orange-200 text-sm font-medium">/mes</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-white shrink-0 mt-0.5" width="18" /><span className="text-sm text-white">2 Chequeos generales anuales</span></li>
                  <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-white shrink-0 mt-0.5" width="18" /><span className="text-sm text-white">Todas las vacunas anuales</span></li>
                  <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-white shrink-0 mt-0.5" width="18" /><span className="text-sm text-white">Desparasitación interna bi-mensual</span></li>
                  <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-white shrink-0 mt-0.5" width="18" /><span className="text-sm text-white">1 Análisis de sangre anual</span></li>
                  <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-white shrink-0 mt-0.5" width="18" /><span className="text-sm text-white">10% de descuento en servicios</span></li>
                </ul>
                <a href="#contacto" className="animate-btn-pulse-dark inline-flex justify-center w-full py-3.5 rounded-full bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-colors shadow-lg">Elegir Plan Integral ✦</a>
              </div>
            </div>

            {/* Plan Senior */}
            <div className="reveal delay-300 group relative bg-neutral-800/60 backdrop-blur-md border border-neutral-700/50 p-8 rounded-[2rem] hover:border-orange-500/40 hover:bg-neutral-800/80 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/30 transition-all duration-500 ease-out flex flex-col">
              {/* Ícono SVG - Perro mayor */}
              <div className="w-14 h-14 rounded-2xl bg-neutral-700/60 border border-neutral-600/50 flex items-center justify-center mb-5 group-hover:border-orange-500/40 group-hover:bg-orange-500/10 transition-all duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                  <path d="M12 2a5 5 0 0 1 5 5c0 1.5-.6 2.9-1.6 3.8L17 14h-4l-1-2-1 2H7l1.6-3.2C7.6 9.9 7 8.5 7 7a5 5 0 0 1 5-5z" />
                  <path d="M9 14v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4" />
                  <path d="M7 8H5a2 2 0 0 0-2 2v1M17 8h2a2 2 0 0 1 2 2v1" />
                  <circle cx="9" cy="6" r="0.5" fill="currentColor" /><circle cx="15" cy="6" r="0.5" fill="currentColor" />
                </svg>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-700/50 text-neutral-400 text-[10px] font-semibold uppercase tracking-wider mb-4 w-fit">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" /></svg>
                +7 años de edad
              </div>
              <h4 className="text-2xl font-bold text-white mb-1">Plan Senior</h4>
              <p className="text-neutral-400 text-sm mb-6">Protección y seguimiento completo para mascotas mayores.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-xs text-neutral-500 font-medium mt-1">$</span>
                <span className="text-4xl font-extrabold text-white tracking-tight">38.000</span>
                <span className="text-neutral-500 text-sm font-medium">/mes</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-orange-400 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-300">Chequeos ilimitados sin costo</span></li>
                <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-orange-400 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-300">Perfil Geriátrico Completo</span></li>
                <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-orange-400 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-300">Electrocardiograma anual</span></li>
                <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-orange-400 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-300">2 Análisis de sangre anuales</span></li>
                <li className="flex items-start gap-3"><Icon icon="solar:check-circle-bold" className="text-orange-400 shrink-0 mt-0.5" width="18" /><span className="text-sm text-neutral-300">Prioridad en turnos urgentes</span></li>
              </ul>
              <a href="#contacto" className="inline-flex justify-center w-full py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-orange-500/20 hover:border-orange-500/50 border border-transparent transition-all duration-300">Comenzar con este plan</a>
            </div>

          </div>

          {/* Nota pie */}
          <p className="text-center text-neutral-600 text-xs mt-10 reveal">Los precios son en pesos argentinos e incluyen IVA. Consultá disponibilidad de planes para tu provincia.</p>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-24 bg-white overflow-hidden reveal">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl lg:text-4xl font-semibold tracking-tighter text-neutral-900 mb-12 text-center">Lo que dicen nuestras familias</h3>
        </div>

        {/* Mobile: carrusel con flechas */}
        <div className="md:hidden px-6">
          <div className="relative">
            {/* Tarjeta activa */}
            <div className="p-8 rounded-2xl border border-neutral-100 bg-neutral-50 flex flex-col justify-between min-h-[220px] transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} icon={i < testimonials[testimonialIndex].stars ? 'solar:star-bold' : 'solar:star-linear'} width="18" />
                  ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">{testimonials[testimonialIndex].text}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                  <img src={testimonials[testimonialIndex].avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{testimonials[testimonialIndex].name}</p>
                  <p className="text-xs text-neutral-500">{testimonials[testimonialIndex].role}</p>
                </div>
              </div>
            </div>

            {/* Flechas */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:border-orange-400 hover:text-orange-500 transition-all duration-300 active:scale-95"
                aria-label="Anterior testimonio"
              >
                <Icon icon="solar:alt-arrow-left-linear" width="20" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    aria-label={`Testimonio ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === testimonialIndex
                        ? 'w-6 h-2 bg-orange-500'
                        : 'w-2 h-2 bg-neutral-300 hover:bg-orange-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:border-orange-400 hover:text-orange-500 transition-all duration-300 active:scale-95"
                aria-label="Siguiente testimonio"
              >
                <Icon icon="solar:alt-arrow-right-linear" width="20" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: marquee infinito */}
        <div className="hidden md:block relative overflow-hidden pause-marquee w-full">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee-track">
            {/* Bloque original */}
            <div className="flex gap-6 shrink-0 py-4 pr-6">
              {testimonials.map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 p-8 rounded-2xl border border-neutral-100 bg-neutral-50 flex flex-col justify-between hover:border-orange-200 transition-colors">
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-6">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Icon key={s} icon={s < t.stars ? 'solar:star-bold' : 'solar:star-linear'} width="18" />
                      ))}
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-8">{t.text}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden"><img src={t.avatar} alt="Avatar" className="w-full h-full object-cover" /></div>
                    <div><p className="text-sm font-semibold text-neutral-900">{t.name}</p><p className="text-xs text-neutral-500">{t.role}</p></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Bloque duplicado para loop infinito */}
            <div className="flex gap-6 shrink-0 py-4 pr-6" aria-hidden="true">
              {testimonials.map((t, i) => (
                <div key={i} className="w-[350px] shrink-0 p-8 rounded-2xl border border-neutral-100 bg-neutral-50 flex flex-col justify-between hover:border-orange-200 transition-colors">
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-6">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Icon key={s} icon={s < t.stars ? 'solar:star-bold' : 'solar:star-linear'} width="18" />
                      ))}
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-8">{t.text}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden"><img src={t.avatar} alt="Avatar" className="w-full h-full object-cover" /></div>
                    <div><p className="text-sm font-semibold text-neutral-900">{t.name}</p><p className="text-xs text-neutral-500">{t.role}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 relative overflow-hidden reveal">
        <div className="absolute inset-0 bg-neutral-50 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sky-300/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute top-10 right-0 w-[350px] h-[350px] bg-sky-200/15 rounded-full blur-[90px] -z-10 pointer-events-none" />

        {/* Huellas decorativas corregidas */}
        <svg className="absolute top-8 left-8 text-orange-300/30 pointer-events-none -z-10 rotate-12" width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
          <ellipse cx="20" cy="12" rx="6" ry="8" />
          <ellipse cx="36" cy="8" rx="6" ry="8" />
          <ellipse cx="51" cy="13" rx="5" ry="7" />
          <ellipse cx="59" cy="28" rx="4.5" ry="6.5" />
          <path d="M32 28c-11 0-18 6-18 13 0 6 5 10 10 10h16c5 0 10-4 10-10 0-7-7-13-18-13z" />
        </svg>

        <svg className="absolute bottom-12 right-12 text-orange-300/25 pointer-events-none -z-10 -rotate-20" width="80" height="80" viewBox="0 0 64 64" fill="currentColor">
          <ellipse cx="20" cy="12" rx="6" ry="8" />
          <ellipse cx="36" cy="8" rx="6" ry="8" />
          <ellipse cx="51" cy="13" rx="5" ry="7" />
          <ellipse cx="59" cy="28" rx="4.5" ry="6.5" />
          <path d="M32 28c-11 0-18 6-18 13 0 6 5 10 10 10h16c5 0 10-4 10-10 0-7-7-13-18-13z" />
        </svg>

        <svg className="absolute top-1/2 left-6 text-amber-300/20 pointer-events-none -z-10 rotate-45" width="48" height="48" viewBox="0 0 64 64" fill="currentColor">
          <ellipse cx="20" cy="12" rx="6" ry="8" />
          <ellipse cx="36" cy="8" rx="6" ry="8" />
          <ellipse cx="51" cy="13" rx="5" ry="7" />
          <ellipse cx="59" cy="28" rx="4.5" ry="6.5" />
          <path d="M32 28c-11 0-18 6-18 13 0 6 5 10 10 10h16c5 0 10-4 10-10 0-7-7-13-18-13z" />
        </svg>

        <svg className="absolute top-1/3 right-8 text-orange-200/20 pointer-events-none -z-10 -rotate-12" width="56" height="56" viewBox="0 0 64 64" fill="currentColor">
          <ellipse cx="20" cy="12" rx="6" ry="8" />
          <ellipse cx="36" cy="8" rx="6" ry="8" />
          <ellipse cx="51" cy="13" rx="5" ry="7" />
          <ellipse cx="59" cy="28" rx="4.5" ry="6.5" />
          <path d="M32 28c-11 0-18 6-18 13 0 6 5 10 10 10h16c5 0 10-4 10-10 0-7-7-13-18-13z" />
        </svg>

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-orange-100 shadow-sm text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">
              <Icon icon="solar:question-circle-linear" width="16" />
              <span>FAQ</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-semibold tracking-tighter text-neutral-900">Preguntas Frecuentes</h3>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
                iconType: "stroke",
                q: "¿Atienden emergencias fuera del horario comercial?",
                a: "Sí, contamos con un equipo de guardia disponible las 24 horas del día, los 7 días de la semana para atender cualquier emergencia que tu mascota pueda tener. Solo llámanos a nuestro número principal antes de venir."
              },
              {
                icon: <><ellipse cx="6" cy="7" rx="2" ry="2.5" /><ellipse cx="11" cy="5" rx="2" ry="2.5" /><ellipse cx="16" cy="6" rx="2" ry="2.5" /><ellipse cx="19.5" cy="10.5" rx="1.5" ry="2" /><path d="M12 10.5c-3.5 0-6 2-6 4.5 0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-2.5-2.5-4.5-6-4.5z" /></>,
                iconType: "fill",
                q: "¿Qué tipos de animales atienden?",
                a: "Nos especializamos en pequeños animales, principalmente perros y gatos. También contamos con un especialista en animales exóticos (aves, pequeños roedores, reptiles) que atiende con turno previo."
              },
              {
                icon: <><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
                iconType: "stroke",
                q: "¿Cómo funcionan los planes de cuidado mensual?",
                a: "Nuestros planes mensuales son suscripciones que cubren las necesidades preventivas anuales (vacunas, desparasitación, chequeos) distribuidas en una cuota mensual fija, además de ofrecer descuentos en otros servicios."
              },
              {
                icon: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" /></>,
                iconType: "stroke",
                q: "¿Realizan cirugías y procedimientos complejos?",
                a: "Sí, contamos con un quirófano completamente equipado y especialistas cirujanos para realizar desde procedimientos de rutina, como castraciones, hasta cirugías traumatológicas o de tejidos blandos más complejas."
              },
              {
                icon: <><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /><path d="M16 12h5v4h-5a2 2 0 0 1 0-4z" /></>,
                iconType: "stroke",
                q: "¿Qué métodos de pago aceptan?",
                a: "Aceptamos efectivo, tarjetas de débito y crédito (con planes de cuotas disponibles dependiendo del banco), transferencias bancarias y las principales billeteras virtuales."
              },
              {
                icon: <><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" /><path d="M8 7V5a2 2 0 0 1 4 0v2M12 12v4M10 14h4" /></>,
                iconType: "stroke",
                q: "¿Necesito turno previo o puedo ir sin reserva?",
                a: "Recomendamos sacar turno previo para garantizar la atención en el horario que más te convenga. Sin embargo, atendemos sin turno en casos de urgencia o consultas rápidas, sujeto a disponibilidad del día."
              },
              {
                icon: <><path d="M12 2a7 7 0 0 1 7 7c0 4-3 7-7 9-4-2-7-5-7-9a7 7 0 0 1 7-7z" /><path d="M12 7v4M12 13h.01" /></>,
                iconType: "stroke",
                q: "¿Cómo preparo a mi mascota para una cirugía?",
                a: "Te indicaremos todas las instrucciones específicas al confirmar el turno quirúrgico. En general, se requiere ayuno de 8 a 12 horas previas, análisis prequirúrgicos y en algunos casos una consulta de evaluación anestésica previa."
              },
              {
                icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
                iconType: "stroke",
                q: "¿Tienen servicio de internación para mascotas?",
                a: "Sí, contamos con área de internación con monitoreo continuo, temperatura regulada y personal capacitado. Los dueños pueden llamar a consultar el estado de su mascota en cualquier momento durante su estadía."
              },
            ].map((item, i) => (
              <details key={i} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-100 [&_summary::-webkit-details-marker]:hidden hover:border-orange-300 hover:shadow-md hover:shadow-orange-100 transition-all duration-300">
                <summary className="flex items-center gap-4 p-6 font-medium cursor-pointer text-neutral-900">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-300 group-hover:text-orange-500 group-hover:bg-orange-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg
                      width="22" height="22" viewBox="0 0 24 24"
                      fill={item.iconType === "fill" ? "currentColor" : "none"}
                      stroke={item.iconType === "stroke" ? "currentColor" : "none"}
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <span className="flex-1 text-sm md:text-base">{item.q}</span>
                  <span className="transition duration-300 group-open:-rotate-180 text-neutral-400 shrink-0">
                    <Icon icon="solar:alt-arrow-down-linear" width="20" />
                  </span>
                </summary>
                <p className="text-neutral-500 text-sm px-6 pb-6 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 bg-white relative reveal overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/50 shadow-sm text-orange-500 text-xs font-semibold uppercase tracking-widest mb-6">
              <Icon icon="solar:chat-round-dots-line-duotone" width="16" />
              <span>Contacto</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-semibold tracking-tighter text-neutral-900 mb-4">
              ¿Cómo podemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">ayudarte?</span>
            </h3>
            <p className="text-neutral-500 text-lg">Elegí el canal que más te convenga. Respondemos rápido.</p>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">

            {/* WhatsApp */}
            <a href="https://wa.me/5491143218765?text=Hola!%20Quiero%20reservar%20un%20turno" target="_blank" className="group relative flex flex-col items-center text-center p-8 rounded-3xl overflow-hidden border border-neutral-100 hover:border-[#25D366]/50 hover:shadow-xl hover:shadow-green-100 transition-all duration-500 cursor-pointer min-h-[280px] justify-between">
              {/* Imagen de fondo */}
              <img src="/background.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25D366]/10 via-[#25D366]/5 to-white/80"></div>
              {/* Contenido */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#25D366]/25 group-hover:border-[#25D366]/40 transition-all duration-300 shadow-sm">
                  <img src="https://img.icons8.com/color/96/whatsapp--v1.png" alt="WhatsApp" className="w-9 h-9 object-contain" />
                </div>
                <p className="text-xs font-semibold text-[#25D366]/70 uppercase tracking-widest mb-1">WhatsApp</p>
                <p className="text-base font-bold text-neutral-900 mb-2">+54 11 4321-8765</p>
                <p className="text-neutral-500 text-xs leading-relaxed">Respondemos en menos de 1 hora en horario comercial.</p>
              </div>
              <span className="relative z-10 mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-green-200 transition-all duration-300">
                <img src="https://img.icons8.com/color/96/whatsapp--v1.png" alt="" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
                Escribinos
              </span>
              {/* Badge online */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                <span className="text-[10px] font-semibold text-[#25D366]">Online</span>
              </div>
            </a>

            {/* Teléfono */}
            <a href="tel:+541143218765" className="group relative flex flex-col items-center text-center p-8 rounded-3xl overflow-hidden border border-neutral-100 hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-100 transition-all duration-500 cursor-pointer min-h-[280px] justify-between">
              <img src="/background.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 via-sky-500/5 to-white/80"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-200 group-hover:border-sky-300 transition-all duration-300 shadow-sm">
                  <img src="https://img.icons8.com/color/96/phone--v1.png" alt="Teléfono" className="w-9 h-9 object-contain" />
                </div>
                <p className="text-xs font-semibold text-sky-500/70 uppercase tracking-widest mb-1">Teléfono</p>
                <p className="text-base font-bold text-neutral-900 mb-2">+54 11 4321-8765</p>
                <p className="text-neutral-500 text-xs leading-relaxed">Lunes a viernes de 8 a 20 hs. Sábados de 9 a 16 hs.</p>
              </div>
              <span className="relative z-10 mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-sky-200 transition-all duration-300">
                <img src="https://img.icons8.com/color/96/phone--v1.png" alt="" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
                Llamar ahora
              </span>
            </a>

            {/* Email */}
            <a href="mailto:hola@petly.com" className="group relative flex flex-col items-center text-center p-8 rounded-3xl overflow-hidden border border-neutral-100 hover:border-red-400/50 hover:shadow-xl hover:shadow-red-100 transition-all duration-500 cursor-pointer min-h-[280px] justify-between">
              <img src="/background.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 via-red-500/5 to-white/80"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-red-100 group-hover:border-red-200 transition-all duration-300 shadow-sm">
                  <img src="https://img.icons8.com/color/96/gmail-new.png" alt="Email" className="w-9 h-9 object-contain" />
                </div>
                <p className="text-xs font-semibold text-red-500/70 uppercase tracking-widest mb-1">Email</p>
                <p className="text-base font-bold text-neutral-900 mb-2">hola@petly.com</p>
                <p className="text-neutral-500 text-xs leading-relaxed">Para consultas o presupuestos. Respondemos en 24 hs.</p>
              </div>
              <span className="relative z-10 mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-red-200 transition-all duration-300">
                <img src="https://img.icons8.com/color/96/gmail-new.png" alt="" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
                Enviar email
              </span>
            </a>

            {/* Facebook */}
            <a href="https://facebook.com/petly" target="_blank" className="group relative flex flex-col items-center text-center p-8 rounded-3xl overflow-hidden border border-neutral-100 hover:border-[#1877F2]/50 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500 cursor-pointer min-h-[280px] justify-between">
              <img src="/background.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1877F2]/10 via-[#1877F2]/5 to-white/80"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#1877F2]/20 group-hover:border-[#1877F2]/40 transition-all duration-300 shadow-sm">
                  <img src="https://img.icons8.com/color/96/facebook-new.png" alt="Facebook" className="w-9 h-9 object-contain" />
                </div>
                <p className="text-xs font-semibold text-[#1877F2]/70 uppercase tracking-widest mb-1">Facebook</p>
                <p className="text-base font-bold text-neutral-900 mb-2">Petly Veterinaria</p>
                <p className="text-neutral-500 text-xs leading-relaxed">Seguinos para novedades, consejos y promociones.</p>
              </div>
              <span className="relative z-10 mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-blue-200 transition-all duration-300">
                <img src="https://img.icons8.com/color/96/facebook-new.png" alt="" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
                Ver página
              </span>
            </a>

          </div>

          {/* Mapa + Horarios */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Mapa */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-100 min-h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016839756995!2d-58.41799492346779!3d-34.58039545656389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5884f0f0001%3A0x39f9a4f5ca397e47!2sAv.%20del%20Libertador%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
              {/* Overlay con dirección encima del mapa */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                    <Icon icon="solar:map-point-line-duotone" width="18" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">Av. Libertador 1234, CABA</p>
                    <p className="text-[11px] text-neutral-500">A 2 cuadras del subte D · Estacionamiento exclusivo</p>
                  </div>
                </div>
                <a href="https://maps.google.com/?q=Av.+Libertador+1234+Buenos+Aires" target="_blank" className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500 text-white text-[11px] font-bold hover:bg-orange-600 transition-colors">
                  <Icon icon="solar:map-point-linear" width="12" />
                  Cómo llegar
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Icon icon="solar:clock-circle-line-duotone" width="22" />
              </div>
              <div className="w-full">
                <p className="text-sm font-semibold text-neutral-900 mb-2">Horarios de atención</p>
                <div className="space-y-1 text-sm text-neutral-500">
                  <div className="flex justify-between"><span>Lunes a Viernes</span><span className="font-medium text-neutral-700">08:00 – 20:00</span></div>
                  <div className="flex justify-between"><span>Sábados</span><span className="font-medium text-neutral-700">09:00 – 16:00</span></div>
                  <div className="flex justify-between"><span>Urgencias</span><span className="font-medium text-orange-500">24 / 7</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 pt-16 pb-8 reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-4">
                <img src="/petly.png" alt="Petly" className="h-10 w-auto object-contain -ml-2" />
              </a>
              <p className="text-sm text-neutral-500 leading-relaxed">Tu clínica veterinaria de confianza. Brindamos atención médica integral con el más alto estándar de calidad y calidez humana.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-4 tracking-tight">Compañía</h4>
              <ul className="space-y-3">
                <li><a href="#nosotros" className="text-sm text-neutral-500 hover:text-orange-500 transition-colors">Sobre nosotros</a></li>
                <li><a href="#servicios" className="text-sm text-neutral-500 hover:text-orange-500 transition-colors">Servicios</a></li>
                <li><a href="#testimonios" className="text-sm text-neutral-500 hover:text-orange-500 transition-colors">Testimonios</a></li>
                <li><a href="#faq" className="text-sm text-neutral-500 hover:text-orange-500 transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-4 tracking-tight">Contacto</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-neutral-500">
                  <Icon icon="solar:map-point-linear" width="18" className="mt-0.5" />
                  <span>Av. Libertador 1234, CABA.<br />Estacionamiento exclusivo.</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-500">
                  <Icon icon="solar:phone-linear" width="18" />
                  <span>+54 11 4321-8765</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-500">
                  <Icon icon="solar:letter-linear" width="18" />
                  <span>hola@petly.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-4 tracking-tight">Horarios</h4>
              <ul className="space-y-2 mb-6 text-sm text-neutral-500">
                <li className="flex justify-between"><span>Lunes a Viernes</span><span>08:00 - 20:00</span></li>
                <li className="flex justify-between"><span>Sábados</span><span>09:00 - 16:00</span></li>
                <li className="flex justify-between text-orange-600 font-medium"><span>Urgencias</span><span>24/7</span></li>
              </ul>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-orange-500 hover:border-orange-500 transition-colors">
                  <Icon icon="mdi:instagram" width="16" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-orange-500 hover:border-orange-500 transition-colors">
                  <Icon icon="mdi:facebook" width="16" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400">© 2026 Petly Clínica Veterinaria. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="text-xs text-neutral-400 hover:text-neutral-600">Privacidad</a>
              <a href="#" className="text-xs text-neutral-400 hover:text-neutral-600">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
