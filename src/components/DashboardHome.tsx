
const DashboardHome = () => {
    return (
        <div className="grid grid-rows-1">
            <div className="grid grid-cols-12 p-5">
                <div className="col-span-12 grid h-screen place-items-center">
                    <div>
                        <img
                            alt="DigitalFlake"
                            src="src/assets/logo.png"
                            className="mx-auto h-44 w-auto"
                        />
                        <h3>Welcome to DigitalFlake Admin</h3></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHome;