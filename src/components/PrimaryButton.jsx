function PrimaryButton({children, onClick, type}) {
    return (
            <button
                className=" text-text-primary cursor-pointer shadow-md shadow-[#4A87DE] bg-primary h-fit w-full  p-2 hover:bg-primary-hover focus:bg-primary-focus hover:shadow-md hover:shadow-[#F5FFFE]/75 hover:text-[#185686] relative inline-flex items-center justify-center text-lg transition-all duration-200 rounded-xl focus:outline-none focus:primary-focus focus:ring-2 focus:ring-offset-2 disabled:bg-[#0D2132
                ]  "
                type={type}
                onClick={onClick}>

                {children}
            </button>
    );
}

export default PrimaryButton;