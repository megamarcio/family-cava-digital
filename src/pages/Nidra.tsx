import ProductFunnel from '../components/ProductFunnel'

export default function Nidra() {
  return (
    <ProductFunnel
      id="nidra"
      checkoutParam="nidra"
      intro={{ title: 'Qual é o seu padrão de sono?', sub: 'Responda 3 perguntas e receba sua trilha de Yoga Nidra ideal.' }}
      comoFunciona={[
        { t: 'Diagnóstico de sono', d: 'Um quiz curto identifica o que tira o seu descanso.' },
        { t: 'Trilha guiada', d: 'Áudios de Yoga Nidra (sono yóguico) com evidência para estresse e sono.' },
        { t: 'Sonho lúcido', d: 'Método MILD para ganhar consciência dentro do sonho.' },
      ]}
      quiz={[
        {
          id: 'adormecer',
          title: 'Quanto tempo você leva para pegar no sono?',
          options: [
            { label: 'Menos de 15 min', emoji: '😌', score: 0 },
            { label: '15 a 40 min', emoji: '🙂', score: 1 },
            { label: 'Mais de 40 min', emoji: '😕', score: 2 },
            { label: 'Fico horas acordado', emoji: '😣', score: 3 },
          ],
        },
        {
          id: 'mente',
          title: 'O que mais te atrapalha na hora de dormir?',
          options: [
            { label: 'Mente acelerada', emoji: '🧠', score: 2 },
            { label: 'Tensão no corpo', emoji: '💢', score: 1 },
            { label: 'Acordo no meio da noite', emoji: '🌙', score: 2 },
            { label: 'Durmo, mas não descanso', emoji: '🥱', score: 2 },
          ],
        },
        {
          id: 'objetivo',
          title: 'Qual seria o seu maior ganho?',
          options: [
            { label: 'Adormecer rápido', emoji: '⚡', score: 1 },
            { label: 'Sono profundo', emoji: '🛌', score: 1 },
            { label: 'Ter sonhos lúcidos', emoji: '✨', score: 1 },
            { label: 'Acordar com energia', emoji: '🌞', score: 1 },
          ],
        },
      ]}
      resultado={(s) => s >= 5
        ? { titulo: 'Seu sono está bem fragmentado', texto: 'Mente acelerada e despertares indicam sistema nervoso em alerta. A Yoga Nidra reduz a ativação e reeduca o adormecer — comece pela trilha "desligar a mente".' }
        : s >= 3
        ? { titulo: 'Sono irregular, com espaço para evoluir', texto: 'Você dorme, mas falta profundidade. A trilha de relaxamento + respiração guiada te leva ao sono REM reparador.' }
        : { titulo: 'Boa base — vamos ao próximo nível', texto: 'Seu sono já funciona; é a hora ideal para treinar sonho lúcido e potencializar o descanso.' }
      }
      disclaimer="NIDRA é um programa educativo de relaxamento e práticas de sono baseadas em evidência (Yoga Nidra, higiene do sono e técnicas de sonho lúcido). Não trata transtornos do sono nem substitui acompanhamento médico ou psicológico."
    />
  )
}
