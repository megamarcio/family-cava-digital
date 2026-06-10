import ProductFunnel from '../components/ProductFunnel'

export default function Lumen() {
  return (
    <ProductFunnel
      id="lumen"
      checkoutParam="lumen"
      intro={{ title: 'Como está o seu relógio interno?', sub: '3 perguntas para montar seu protocolo de luz e cor.' }}
      comoFunciona={[
        { t: 'Diagnóstico circadiano', d: 'Descobrimos onde sua exposição à luz está te sabotando.' },
        { t: 'Protocolo de luz', d: 'Luz forte de manhã, menos luz azul à noite — ciência do ritmo circadiano.' },
        { t: 'Cor & ambiente', d: 'Cores e temperatura de luz para relaxar e preparar o sono.' },
      ]}
      quiz={[
        {
          id: 'manha',
          title: 'Você toma sol/luz natural pela manhã?',
          options: [
            { label: 'Todos os dias', emoji: '🌞', score: 0 },
            { label: 'Às vezes', emoji: '⛅', score: 1 },
            { label: 'Quase nunca', emoji: '🏢', score: 2 },
            { label: 'Acordo já no escuro', emoji: '🌑', score: 3 },
          ],
        },
        {
          id: 'noite',
          title: 'E telas/luz azul à noite?',
          options: [
            { label: 'Evito antes de dormir', emoji: '🌙', score: 0 },
            { label: 'Uso um pouco', emoji: '📱', score: 1 },
            { label: 'Fico no celular até apagar', emoji: '🔆', score: 3 },
            { label: 'Durmo com a TV ligada', emoji: '📺', score: 3 },
          ],
        },
        {
          id: 'humor',
          title: 'Como anda seu humor e energia?',
          options: [
            { label: 'Estável', emoji: '🟢', score: 0 },
            { label: 'Oscila bastante', emoji: '🟡', score: 1 },
            { label: 'Baixo, principalmente à tarde', emoji: '🟠', score: 2 },
            { label: 'Desanimado com frequência', emoji: '🔴', score: 2 },
          ],
        },
      ]}
      resultado={(s) => s >= 5
        ? { titulo: 'Seu ritmo circadiano está desregulado', texto: 'Pouca luz de manhã e muita luz à noite confundem seu relógio biológico — isso piora humor e sono. O protocolo LUMEN reorganiza sua exposição à luz em 7 dias.' }
        : s >= 3
        ? { titulo: 'Há ajustes simples com grande efeito', texto: 'Pequenas mudanças na luz da manhã e da noite já melhoram disposição e sono. Seu protocolo personalizado mostra o passo a passo.' }
        : { titulo: 'Boa exposição à luz — vamos refinar', texto: 'Você já acerta o básico. O mapa de cor e ambiente leva seu relaxamento noturno a outro nível.' }
      }
      disclaimer="LUMEN é um guia educativo de higiene de luz e ritmo circadiano (luz natural pela manhã, redução de luz azul à noite) e de ambiente para relaxamento. Os elementos de cor têm finalidade de relaxamento; não são tratamento médico nem substituem acompanhamento profissional."
    />
  )
}
