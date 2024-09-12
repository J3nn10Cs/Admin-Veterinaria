
export const Alerta = ({alerts}) => {
  return (
    <div className={`${alerts.type ? 'from-red-600 to-red-400' : 'from-indigo-600 to-indigo-800'} bg-gradient-to-tr text-center rounded-xl p-3 font-extrabold text-white text-sm`}>
      {alerts.msg}
    </div>
  )
}
