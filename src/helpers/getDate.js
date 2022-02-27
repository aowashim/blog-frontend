export const getDate = () => {
  const d = new Date()
  const curDate = `${d.getDate()}/${
    d.getMonth() + 1
  }/${d.getFullYear()}-${d.getHours()}:${d.getMinutes()}`

  return curDate
}
