export default function Layout({ title, action, children }) {
    return (<>
    <header className="d-flex justify-content-between align-items-center w-100 bg-primary text-white p-3"><h5>WEB 3430</h5> <span>Kyle Calder</span></header>
      <div className='container mt-3'>
        <div className='d-flex align-items-center justify-content-center text-center'>
          <h1 className='display-5 flex-grow-1'>{title}</h1>
        </div>
        <div className="d-flex justify-content-end mb-3">
        <span>{action}</span>
        </div>
        { children }
      </div>
      </>
    )
  }