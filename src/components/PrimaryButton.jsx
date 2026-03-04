function PrimaryButton({children, onClick}) {
    return (
        <div>

            <button
                className=" text-[#090A0E] cursor-pointer shadow-md shadow-[#4A87DE] bg-primary h-fit w-fit p-2 hover:bg-primary-hover focus:bg-primary-focus hover:shadow-md hover:shadow-[#F5FFFE]/75 hover:text-[#185686] relative inline-flex items-center justify-center text-lg transition-all duration-200 rounded-xl focus:outline-none focus:primary-focus focus:ring-2 focus:ring-offset-2 disabled:bg-[#0D2132
                ]  "
                onClick={onClick}>
                {children}
            </button>
        </div>
    );
}

export default PrimaryButton;