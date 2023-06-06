
function Tooltip({ children, tooltipText }: any) {

  return (
    <div className="group flex relative">
      {children}
      <div className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 text-sm text-gray-100 rounded-md absolute left-4 translate-y-full opacity-0  mx-auto whitespace-nowrap border">
        {tooltipText}
      </div>
    </div>
  )
}

export default Tooltip