const debounce = (fn, ms) => {
  let timer
  return _ => {
    clearTimeout(timer)

    timer = setTimeout(_ => {
      timer = null
      fn.apply(this)
    }, ms)

  };
}

export default debounce;