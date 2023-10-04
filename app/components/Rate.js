export default function Rate({value, inflation}) {
  return (
    <span className={value && (parseFloat(value) > inflation ? "bg-green-500/75" : "bg-red-500/75") + " inline-block w-20 p-2 m-2 rounded-md" }>
      {value ? value + '%' : '---'}
    </span>
  )
}
