import React from "react";
import FanHome from "../../../Media/FanHome.png";
import { capitalizeFirstLetter } from "../../../Services/Helper";
import Footer from "../../Ui/Footer";

const FansView = (props) => {
	return (
		<>
			<div className="container mx-auto w-screen font-default  mb-28">
				<img src={FanHome} style={{ height: "400px", width: "100%" }} alt="Fan" />

				{/* Matches div */}
				<div className="my-5">
					<div className="flex">
						{/* Matches */}
						<div className="block p-6 rounded-lg shadow-lg bg-light max-w-sm mx-4">
							<div className="flex justify-between font-sans font-semibold text-secondary-light ">
								<p>
									{capitalizeFirstLetter("girls")} {capitalizeFirstLetter("BBall")}
								</p>
								<p>FINAL</p>
							</div>

							<div className="flex justify-between items-center my-2">
								<div className="flex items-center gap-2 lg:gap-5">
									<div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
									<p className="text-sm lg:text-2xl font-bold text-secondary-light">{capitalizeFirstLetter("Team1")}</p>
								</div>
								<p className="font-bold text-secondary-light text-sm lg:text-2xl ml-20">64</p>
							</div>

							<div className="flex justify-between items-center">
								<div className="flex items-center gap-2 lg:gap-5">
									<div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
									<p className="text-sm lg:text-2xl text-secondary-light">{capitalizeFirstLetter("Team2")}</p>
								</div>
								<p className="font-bold text-secondary-light text-sm lg:text-2xl">41</p>
							</div>
						</div>

						<div className="block p-6 rounded-lg shadow-lg bg-light max-w-sm mx-4">
							<div className="flex justify-between font-sans font-semibold text-secondary-light ">
								<p>
									{capitalizeFirstLetter("girls")} {capitalizeFirstLetter("BBall")}
								</p>
								<p>FINAL</p>
							</div>

							<div className="flex justify-between items-center my-2">
								<div className="flex items-center gap-2 lg:gap-5">
									<div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
									<p className="text-sm lg:text-2xl font-bold text-secondary-light">{capitalizeFirstLetter("Team1")}</p>
								</div>
								<p className="font-bold text-secondary-light text-sm lg:text-2xl ml-20">64</p>
							</div>

							<div className="flex justify-between items-center">
								<div className="flex items-center gap-2 lg:gap-5">
									<div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
									<p className="text-sm lg:text-2xl text-secondary-light">{capitalizeFirstLetter("Team2")}</p>
								</div>
								<p className="font-bold text-secondary-light text-sm lg:text-2xl">41</p>
							</div>
						</div>

						<div className="block p-6 rounded-lg shadow-lg bg-light max-w-sm mx-4">
							<div className="flex justify-between font-sans font-semibold text-secondary-light ">
								<p>
									{capitalizeFirstLetter("girls")} {capitalizeFirstLetter("BBall")}
								</p>
								<p>FINAL</p>
							</div>

							<div className="flex justify-between items-center my-2">
								<div className="flex items-center gap-2 lg:gap-5">
									<div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
									<p className="text-sm lg:text-2xl font-bold text-secondary-light">{capitalizeFirstLetter("Team1")}</p>
								</div>
								<p className="font-bold text-secondary-light text-sm lg:text-2xl ml-20">64</p>
							</div>

							<div className="flex justify-between items-center">
								<div className="flex items-center gap-2 lg:gap-5">
									<div className="rounded-full h-10 w-10 lg:h-20 lg:w-20 bg-white"></div>
									<p className="text-sm lg:text-2xl text-secondary-light">{capitalizeFirstLetter("Team2")}</p>
								</div>
								<p className="font-bold text-secondary-light text-sm lg:text-2xl">41</p>
							</div>
						</div>
					</div>
				</div>

				{/* News Div */}
				<div className="flex justify-center">
					<div className="w-4/6">
						<h1 className="ml-5" style={{fontSize:'40px', fontWeight:'900'}}>NEWS</h1>
						<div>
							<div className="flex gap-2 my-2">
								<div className="1/5">
									<div className="bg-light" style={{ width: "100px", height: "100px" }}></div>
								</div>
								<div className="4/5">
									<h1 style={{fontSize:'30px'}}>Article # 1</h1>
									<p>Date</p>
									<p>Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet.</p>
								</div>
							</div>

                            <div className="flex gap-2 my-2">
								<div className="1/5">
									<div className="bg-light" style={{ width: "100px", height: "100px" }}></div>
								</div>
								<div className="4/5">
									<h1 style={{fontSize:'30px'}}>Article # 2</h1>
									<p>Date</p>
									<p>Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet.</p>
								</div>
							</div>

                            <div className="flex gap-2 my-2">
								<div className="1/5">
									<div className="bg-light" style={{ width: "100px", height: "100px" }}></div>
								</div>
								<div className="4/5">
									<h1 style={{fontSize:'30px'}}>Article # 3</h1>
									<p>Date</p>
									<p>Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet. Lorem ipsem dolar imet.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default FansView;
