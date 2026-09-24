/** Observa a visibilidade de um elemento. Retorna a função de limpeza. */
export function watchInView(
  el: Element,
  callback: (visible: boolean) => void,
  options: IntersectionObserverInit = { threshold: 0.15 },
): () => void {
  const observer = new IntersectionObserver(([entry]) => callback(entry.isIntersecting), options);
  observer.observe(el);
  return () => observer.disconnect();
}

/** Dispara `callback` uma única vez, na primeira vez em que o elemento entra na tela. */
export function onceInView(
  el: Element,
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.2 },
): () => void {
  const stop = watchInView(
    el,
    (visible) => {
      if (!visible) return;
      stop();
      callback();
    },
    options,
  );
  return stop;
}
