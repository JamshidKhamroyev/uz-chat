import Navbar from "./navbar"
import Sidebar from "./sidebar"

const Layout = ({ showSidebar = false, children }) => {
  return (
    <div className="min-h-screen">
        <div className="flex">
            {showSidebar && <Sidebar /> }

            <div className="flex flex-1 flex-col">
                <Navbar />

                <main>
                    {children}
                </main>
            </div>
        </div>
    </div>
  )
}

export default Layout