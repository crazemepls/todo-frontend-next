
function Tooltip({children, tooltipText}: any) {

  return (
    <div className="group flex relative">
    {children}
    <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0  mx-auto">{tooltipText}</span>
</div>
  )
}

export default Tooltip