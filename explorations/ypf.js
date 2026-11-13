/* Silstech · YPF case copy. Loads after case.js and overrides its Compass copy (same keys, same layout).
   Draft written from the home copy: facts and numbers in [brackets] come from Mauro. */
(window.MI_PAGES = window.MI_PAGES || []).push(M => {
  const { T } = M;
  Object.assign(T.en, {
    'c.doc': 'Silstech · YPF — Case study · Mauro Imán',
    'c.kicker': 'Case study · Energy · Logistics and safety · [year]',
    'c.f.roleV': '[Lead product designer]', 'c.f.scopeV': 'Product strategy · Driver app · Control tower · Safety and compliance',
    'c.f.teamV': '[Silstech team, YPF operations and carriers]', 'c.f.timeV': '[Years]',
    'c.cover': 'Silstech · YPF product cover',
    'c.m1': 'built from scratch', 'c.m2': '[carriers on the platform]', 'c.m3': '[trips tracked per month]',
    'c.q.pV': 'Fuel moved across the country through hundreds of carriers, each coordinated by phone, paper and spreadsheets, and safety issues surfaced days after they happened.',
    'c.q.dV': 'Designed from zero a national platform: a driver app that works on the road, a live control tower for YPF and one shared record for safety and compliance.',
    'c.q.rV': '[The outcome in one line, with a number: for example, incidents detected in minutes instead of days.]',
    'c.story.h': 'From radio and paper to one live map.',
    'c.s1.k': 'Problem', 'c.s1.h': 'A national operation run on calls, paper and good will.', 'c.s1.p': 'Every carrier had its own way of dispatching, reporting and checking trucks. YPF could not see a trip until it was over, and drivers filled in the same forms again and again, often without signal.', 'c.s1.ph': '→ [data point: carriers, trucks or daily trips at the start]',
    'c.s2.k': 'Decision', 'c.s2.h': 'Start from the driver, then give the operation one source of truth.', 'c.s2.p': 'Instead of digitizing every form, we designed around the trip: the driver app guides each step and works offline; everything it records feeds a control tower where YPF and carriers see the same live state.', 'c.s2.ph': '→ [the key decision, in one line]',
    'c.s3.k': 'Result', 'c.s3.h': 'Every trip visible, every check on record.', 'c.s3.p': 'Dispatch, safety checks and incidents now live in one place, so problems are caught while the truck is still on the road, not in next week’s report.', 'c.s3.ph': '→ [impact metric]',
    'c.did.h': 'Three products, one trip.',
    'c.w1.h': 'Driver app for the road', 'c.w1.p': 'Step-by-step trip flow with pre-trip inspections, checkpoints and incident reporting, designed for gloves, sunlight and no signal. [Details: drivers, devices, adoption.]', 'c.w1.ph': '[screen: driver trip flow]',
    'c.w2.h': 'Control tower', 'c.w2.p': 'A live map and alert queue where YPF and each carrier follow trips, deviations and stops in real time. [Details: who uses it, alerts per day, response time.]', 'c.w2.ph': '[screen: control tower map]',
    'c.w3.h': 'Safety and compliance record', 'c.w3.p': 'Documents, inspections and incidents for every truck and driver, with expirations flagged before they block a trip. [Details: document types, audits, what changed.]', 'c.w3.ph': '[screen: compliance record]',
    'c.ref.q': '[What this project taught me, in one or two sentences.]',
    'c.next': 'Next case'
  });
  Object.assign(T.es, {
    'c.doc': 'Silstech · YPF — Caso de estudio · Mauro Imán',
    'c.kicker': 'Caso de estudio · Energía · Logística y seguridad · [año]',
    'c.f.roleV': '[Lead product designer]', 'c.f.scopeV': 'Estrategia de producto · App de choferes · Torre de control · Seguridad y compliance',
    'c.f.teamV': '[Equipo de Silstech, operaciones de YPF y transportistas]', 'c.f.timeV': '[Años]',
    'c.cover': 'Portada del producto Silstech · YPF',
    'c.m1': 'construido desde cero', 'c.m2': '[transportistas en la plataforma]', 'c.m3': '[viajes monitoreados por mes]',
    'c.q.pV': 'El combustible se movía por todo el país a través de cientos de transportistas, coordinados por teléfono, papel y planillas, y los problemas de seguridad aparecían días después.',
    'c.q.dV': 'Diseñé desde cero una plataforma nacional: una app para choferes que funciona en la ruta, una torre de control en vivo para YPF y un único registro de seguridad y compliance.',
    'c.q.rV': '[El resultado en una línea, con un número: por ejemplo, incidentes detectados en minutos en vez de días.]',
    'c.story.h': 'De la radio y el papel a un solo mapa en vivo.',
    'c.s1.k': 'Problema', 'c.s1.h': 'Una operación nacional sostenida con llamadas, papel y buena voluntad.', 'c.s1.p': 'Cada transportista despachaba, reportaba y revisaba camiones a su manera. YPF no veía un viaje hasta que terminaba, y los choferes completaban los mismos formularios una y otra vez, muchas veces sin señal.', 'c.s1.ph': '→ [dato: transportistas, camiones o viajes diarios al inicio]',
    'c.s2.k': 'Decisión', 'c.s2.h': 'Empezar por el chofer y darle a la operación una sola fuente de verdad.', 'c.s2.p': 'En lugar de digitalizar cada formulario, diseñamos alrededor del viaje: la app guía cada paso y funciona sin conexión; todo lo que registra alimenta una torre de control donde YPF y los transportistas ven el mismo estado en vivo.', 'c.s2.ph': '→ [la decisión clave, en una línea]',
    'c.s3.k': 'Resultado', 'c.s3.h': 'Cada viaje visible, cada control registrado.', 'c.s3.p': 'Despacho, controles de seguridad e incidentes viven en un solo lugar, así los problemas se detectan con el camión todavía en la ruta, no en el informe de la semana siguiente.', 'c.s3.ph': '→ [métrica de impacto]',
    'c.did.h': 'Tres productos, un solo viaje.',
    'c.w1.h': 'App de choferes para la ruta', 'c.w1.p': 'Flujo de viaje paso a paso con inspección previa, puntos de control y reporte de incidentes, pensado para guantes, sol directo y sin señal. [Detalle: choferes, dispositivos, adopción.]', 'c.w1.ph': '[pantalla: flujo de viaje del chofer]',
    'c.w2.h': 'Torre de control', 'c.w2.p': 'Un mapa en vivo y una cola de alertas donde YPF y cada transportista siguen viajes, desvíos y paradas en tiempo real. [Detalle: quién la usa, alertas por día, tiempo de respuesta.]', 'c.w2.ph': '[pantalla: mapa de la torre de control]',
    'c.w3.h': 'Registro de seguridad y compliance', 'c.w3.p': 'Documentos, inspecciones e incidentes de cada camión y chofer, con vencimientos avisados antes de que bloqueen un viaje. [Detalle: tipos de documento, auditorías, qué cambió.]', 'c.w3.ph': '[pantalla: registro de compliance]',
    'c.ref.q': '[Qué me enseñó este proyecto, en una o dos frases.]',
    'c.next': 'Siguiente caso'
  });
});
