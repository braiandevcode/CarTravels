import { ArrowLeft, FileText } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const currentYear: number = new Date().getFullYear()

const TermsPage = ():ReactNode => {
  return (
    <div className="min-h-[calc(100vh-140px)]">
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-amber/15 border border-accent-amber/20">
              <FileText className="h-5 w-5 text-accent-amber" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-black text-text-primary font-display tracking-tight">
              Términos y Condiciones
            </h1>
          </div>
          <p className="text-sm text-text-muted">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>
        </div>

        <div className="space-y-8 animate-fade-in-up stagger-1">
          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              1. Lo que tenés que saber
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Al usar carTravels, estás de acuerdo con estas reglas. Si no estás de acuerdo
              con algo, por favor no uses la aplicación.
            </p>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              2. ¿Qué hace carTravels?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              carTravels es una calculadora que te ayuda a hacer las cuentas de tu jornada
              de forma automática. Con ella podés:
            </p>
            <ul className="space-y-2 text-text-secondary pl-6 list-disc">
              <li>Calcular cuánto le corresponde a la agencia, a vos y al vehículo</li>
              <li>Registrar lo que gastaste en combustible</li>
              <li>Calcular viajes a diferentes fábricas</li>
              <li>Generar un resumen en PDF para descargar o compartir</li>
            </ul>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              3. Tus datos
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Todo lo que ingresas en carTravels se guarda directamente en tu teléfono
              o computadora. Esto significa:
            </p>
            <ul className="space-y-2 text-text-secondary pl-6 list-disc">
              <li>Solo vos podés ver tus datos</li>
              <li>No enviamos nada a internet ni a ningún servidor</li>
              <li>Si borras los datos de tu navegador, perderás lo que hayas guardado</li>
            </ul>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              4. Importante
            </h2>
            <p className="text-text-secondary leading-relaxed">
              carTravels está para ayudarte, pero siempre te recomendamos verificar los
              resultados antes de presentarlos a tu agencia. Si bien nos esforzamos para
              que todo sea exacto, no podemos garantizar que no haya errores. carTravels
              no se responsabiliza por diferencias en los cálculos ni por decisiones que
              tomes basadas en los resultados.
            </p>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              5. Uso permitido
            </h2>
            <p className="text-text-secondary leading-relaxed">
              carTravels es para uso personal. Podés usarla para hacer tus propios cálculos
              de jornada. No está permitido: modificar la aplicación, usarla para fines
              ilegales, o venderla/distribuirla a otras personas.
            </p>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              6. Cambios
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Podemos actualizar estos términos en cualquier momento. Si seguís usando
              carTravels después de un cambio, significa que estás de acuerdo con las
              nuevas reglas.
            </p>
          </section>

          <section className="card-glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary font-display mb-4">
              7. Contacto
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Si tenés alguna pregunta, podés contactarnos a través de nuestras redes
              sociales.
            </p>
          </section>

          <div className="text-center py-4">
            <p className="text-sm text-text-muted">
              © {currentYear} carTravels. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage;