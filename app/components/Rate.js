export default function Rate({value, inflation}) {
  return (
    <span className={value && (parseFloat(value) > inflation ? "text-green-500" : "text-red-500")}>
      {value ? value + '%' : '---'}
    </span>
  )
}
