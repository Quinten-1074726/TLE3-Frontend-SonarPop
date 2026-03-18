export default function AiPolicyPage() {
  const recommendationSignals = [
    {
      label: "Luistergeschiedenis",
      value: "38%",
      desc: "Welke genres, artiesten en tempo's je vaker afspeelt.",
    },
    {
      label: "Recente acties",
      value: "24%",
      desc: "Wat je recent hebt geliket, geskipt of opgeslagen.",
    },
    {
      label: "Context",
      value: "18%",
      desc: "Moment van de dag, energie en huidige luistersessie.",
    },
    {
      label: "Ontdekkingsruimte",
      value: "12%",
      desc: "Ruimte die bewust wordt gebruikt om buiten je bubbel te zoeken.",
    },
    {
      label: "Menselijke curatie",
      value: "8%",
      desc: "Handmatige kwaliteitscontrole op diversiteit en bias.",
    },
  ];

  const steps = [
    {
      nr: "01",
      title: "We verzamelen signalen uit jouw gedrag",
      text: "Het systeem kijkt naar je luistergeschiedenis, favoriete genres en artiesten, en naar interacties zoals liken, opslaan en overslaan. Daardoor ontstaat een profiel van jouw voorkeuren en patronen.",
    },
    {
      nr: "02",
      title: "We herkennen je muzikale bubbel",
      text: "Het algoritme detecteert dominante genres, terugkerende artiesttypes en hoeveel variatie er in je gedrag zit. Zo wordt zichtbaar of je vooral binnen dezelfde stijl blijft luisteren.",
    },
    {
      nr: "03",
      title: "We scoren mogelijke nummers",
      text: "Nieuwe tracks krijgen een score op basis van overeenkomst met jouw smaak, actuele context en de kans dat een nummer iets nieuws toevoegt aan je ontdekking.",
    },
    {
      nr: "04",
      title: "We voegen bewust variatie toe",
      text: "Niet alleen bekende voorkeuren tellen mee. Het model reserveert ook ruimte voor verrassende aanbevelingen, zodat je niet steeds dezelfde soort muziek blijft horen.",
    },
    {
      nr: "05",
      title: "Een curator bewaakt eerlijkheid en diversiteit",
      text: "Het systeem ondersteunt aanbevelingen, maar menselijke controle blijft belangrijk. Een curator monitort patronen, bias en diversiteit en kan parameters bijsturen wanneer aanbevelingen te eenzijdig worden.",
    },
  ];

  const recommendationCards = [
    {
      title: "Waarom dit nummer nu?",
      badge: "Aanbeveling A",
      reason: "Je luisterde de afgelopen week veel elektronische pop met zachte vocalen.",
      details: ["Matcht met je favoriete tempo", "Ligt dicht bij recente likes", "Voegt een nieuw subgenre toe"],
    },
    {
      title: "Waarom dit buiten je bubbel valt",
      badge: "Aanbeveling B",
      reason: "Dit nummer sluit aan op je energielevel, maar komt uit een stijl die minder vaak in je geschiedenis voorkomt.",
      details: ["Lagere genre-overlap", "Hogere ontdekkingsscore", "Gekozen voor extra variatie"],
    },
  ];

  const controls = [
    "Meer bekend / meer verrassend",
    "Minder van hetzelfde genre",
    "Meer onbekende artiesten",
    "Vergelijken met vriendprofiel",
    '"Wat-als" scenario starten',
  ];

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-8 pt-8">
        <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute left-0 top-24 h-24 w-24 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] tracking-wide text-text-primary/80">
            <span className="h-2 w-2 rounded-full bg-secondary-hover shadow-[0_0_14px_rgba(132,186,233,0.9)]" />
            Transparante AI-aanbevelingen
          </div>

          <div className="space-y-3">
            <h1 className="h1 max-w-[12ch]">Hoe werkt het algoritme?</h1>
            <p className="max-w-[34ch] text-sm leading-6 text-text-primary/80">
              Deze pagina laat zien hoe nummers worden aanbevolen, welke data wordt gebruikt en hoe jij invloed houdt op je eigen muziekbubbel.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_25px_rgba(0,0,0,0.18)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-text-primary/55">Belofte</p>
              <p className="mt-2 text-sm leading-5 text-text-primary">Niet alleen relevant, maar ook uitlegbaar.</p>
            </div>
            <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-4 shadow-[0_0_35px_rgba(24,86,134,0.2)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-text-primary/55">Jouw regie</p>
              <p className="mt-2 text-sm leading-5 text-text-primary">Je kunt bijsturen hoe ontdekkend aanbevelingen zijn.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="h2">Welke data telt mee?</h2>
            <p className="mt-2 text-sm leading-6 text-text-primary/75">
              Het systeem gebruikt meerdere signalen om aanbevelingen op te bouwen.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {recommendationSignals.map((signal) => (
            <div
              key={signal.label}
              className="rounded-2xl border border-white/8 bg-[#0f1418] p-4 shadow-[0_0_24px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-text-primary">{signal.label}</h3>
                <span className="rounded-full border border-secondary/40 bg-secondary/15 px-2.5 py-1 text-xs text-secondary-hover">
                  {signal.value}
                </span>
              </div>
              <p className="text-sm leading-6 text-text-primary/72">{signal.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-8">
        <div className="mb-6 space-y-2">
          <h2 className="h2">Zo bouwt het systeem een aanbeveling op</h2>
          <p className="text-sm leading-6 text-text-primary/75">
            Van gedrag naar uitleg: dit zijn de stappen die achter de schermen gebeuren.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <article
              key={step.nr}
              className="rounded-[20px] border border-white/8 bg-gradient-to-br from-white/[0.05] to-secondary/[0.08] p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-hover/50 bg-secondary/20 text-sm font-bold text-secondary-hover shadow-[0_0_16px_rgba(132,186,233,0.35)]">
                  {step.nr}
                </div>
                <h3 className="text-base font-semibold leading-5 text-text-primary">{step.title}</h3>
              </div>
              <p className="text-sm leading-6 text-text-primary/78">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-8">
        <div className="mb-6 space-y-2">
          <h2 className="h2">Waarom wordt een nummer aanbevolen?</h2>
          <p className="text-sm leading-6 text-text-primary/75">
            Elke suggestie krijgt een korte, begrijpelijke uitleg in plaats van een verborgen modelscore.
          </p>
        </div>

        <div className="space-y-4">
          {recommendationCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/8 bg-[#0d1217] p-4 shadow-[0_0_32px_rgba(24,86,134,0.18)]"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-text-primary">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-text-primary/75">{card.reason}</p>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-text-primary/70">
                  {card.badge}
                </span>
              </div>

              <div className="space-y-2">
                {card.details.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-white/[0.03] px-3 py-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary-hover shadow-[0_0_10px_rgba(132,186,233,0.9)]" />
                    <p className="text-sm leading-6 text-text-primary/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-8">
        <div className="rounded-3xl border border-primary/30 bg-primary/10 p-5 shadow-[0_0_35px_rgba(55,103,176,0.18)]">
          <h2 className="h3">Jij houdt invloed</h2>
          <p className="mt-3 text-sm leading-6 text-text-primary/80">
            Het model ondersteunt, maar beslist niet voor jou. Je kunt instellingen aanpassen en alternatieve aanbevelingen verkennen om actief buiten je bubbel te luisteren.
          </p>

          <div className="mt-5 flex gap-3 overflow-x-auto pb-1 scrollbar-soft">
            {controls.map((control) => (
              <button
                key={control}
                type="button"
                className="whitespace-nowrap rounded-xl border border-secondary/30 bg-secondary px-4 py-2.5 text-sm text-text-primary transition hover:bg-secondary-hover hover:text-text-inverse focus:outline-none focus:ring-2 focus:ring-secondary-hover/60"
              >
                {control}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-8 pb-12">
        <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-5">
          <h2 className="h3">Kort samengevat</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-text-primary/78">
            <p>
              Het algoritme kijkt naar jouw luistergedrag, herkent patronen en berekent welke nummers passen bij je smaak én welke tracks nieuwe variatie kunnen brengen.
            </p>
            <p>
              Door per aanbeveling uit te leggen welke signalen meetellen, wordt zichtbaar waarom je iets te horen krijgt.
            </p>
            <p>
              Daarnaast blijft menselijke controle aanwezig via curatie, zodat aanbevelingen niet alleen slim, maar ook eerlijk en divers blijven.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
