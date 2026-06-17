import { ArrowLeft, Shield } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const PrivacyPage = ():ReactNode => {
  const CURRENT_YEAR: number = new Date().getFullYear()
  return (
    <div className="min-safe">
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-teal transition-colors cursor-pointer mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
          Volver al inicio
        </Link>

        <div className="flex flex-col gap-2 mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-teal/15 border border-accent-teal/20">
              <Shield className="h-5 w-5 text-accent-teal" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-black text-text-primary font-display tracking-tight">
              Política de Privacidad
            </h1>
          </div>
          <p className="text-sm text-text-muted">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>
        </div>

        <div className="space-y-8 animate-fade-in-up stagger-1">
          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              Tu privacidad es importante
            </h2>
            <p className="text-text-secondary leading-relaxed">
              En CarTravels nos tomamos muy en serio que tus datos estén protegidos.
              Esta página explica qué hacemos con la información que ingresas.
            </p>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              ¿Qué información guardamos?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Solo guardamos lo que vos ingresás en la calculadora. Nada más. Esto incluye:
            </p>
            <ul className="space-y-2 text-text-secondary pl-6 list-disc">
              <li>Los montos totales de tu jornada</li>
              <li>Lo que gastaste en combustible</li>
              <li>Los viajes a fábricas que hayas cargado</li>
              <li>Los porcentajes que hayas configurado</li>
              <li>Si marcaste que el vehículo es alquilado</li>
            </ul>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              ¿Dónde se guardan tus datos?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              <strong>Directamente en tu teléfono o computadora.</strong>
              No enviamos nada a internet. Esto significa:
            </p>
            <ul className="space-y-2 text-text-secondary pl-6 list-disc">
              <li><strong>Solo vos podés ver tus datos:</strong> Nadie más tiene acceso</li>
              <li><strong>No los enviamos a ningún lugar:</strong> No subimos nada a servidores ni a la nube</li>
              <li><strong>Podés borrarlo cuando quieras:</strong> Usá el botón "Nuevo" dentro de la app o simplemente cerrá la página</li>
              <li><strong>No te seguimos:</strong> No usamos herramientas para saber qué hacés en la app</li>
            </ul>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              ¿Compartimos tus datos con alguien?
            </h2>
            <p className="text-text-secondary leading-relaxed">
              <strong>No. Nunca.</strong>
              No compartimos, vendemos, alquilamos ni le mostramos tus datos a nadie.
              Como tus datos están solo en tu teléfono, ni siquiera nosotros podemos verlos.
            </p>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              ¿Qué pasa con el PDF y el compartir?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Todo se hace directamente en tu teléfono:
            </p>
            <ul className="space-y-2 text-text-secondary pl-6 list-disc">
              <li><strong>PDF:</strong> Se genera en tu propio teléfono. No enviamos nada a ningún servidor</li>
              <li><strong>Compartir por WhatsApp:</strong> Generamos una imagen en tu teléfono que luego podés compartir. Nosotros no intervenimos en eso</li>
            </ul>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              Seguridad
            </h2>
            <p className="text-text-secondary leading-relaxed">
              La conexión a nuestro sitio es segura. Pero recordá: la seguridad de tus
              datos también depende de que mantengas protegido tu teléfono o computadora
              con contraseña.
            </p>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              Lo que podés hacer
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Con tus datos podés:
            </p>
            <ul className="space-y-2 text-text-secondary pl-6 list-disc">
              <li><strong>Verlos:</strong> Siempre están visibles en la calculadora</li>
              <li><strong>Borrarlos:</strong> Usá el botón "Nuevo" para borrar todo de una vez</li>
              <li><strong>Exportarlos:</strong> Generar un PDF con tu resumen</li>
            </ul>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              Cambios en esta política
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Podemos actualizar esta página en el futuro. Si lo hacemos, actualizaremos
              la fecha de "última actualización" que figura al principio.
            </p>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              Contacto
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Si tenés alguna pregunta sobre cómo protegemos tus datos, podés contactarnos
              a través de nuestras redes sociales.
            </p>
          </section>

          <div className="text-center py-4">
            <p className="text-sm text-text-muted">
              © {CURRENT_YEAR} CarTravels. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage;