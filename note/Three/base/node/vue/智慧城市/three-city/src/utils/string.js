
import *  as T from 'three'

export function toFixInt(num) {
  return num.toFixed(0)
}

export function randomColor() {
  return new T.Color(
    Math.random(),
    Math.random(),
    Math.random(),
  ).getHex()
}

