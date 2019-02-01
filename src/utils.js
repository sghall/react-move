
export function numeric(beg, end) {
  const a = +beg
  const b = +end - a
  
  return function(t) {
    return a + b * t
  } 
}