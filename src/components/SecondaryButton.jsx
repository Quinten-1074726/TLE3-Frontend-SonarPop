function SecondaryButton({children}) {
    return (
        <div>

            <button
                className="cursor-pointer text-[#DEF9F6] shadow-md shadow-[#185686] bg-secondary h-fit w-fit p-2 hover:bg-secondary-hover focus:bg-secondary-focus hover:shadow-md hover:shadow-[#84BAE9]/75 hover:text-[#090A0E] relative inline-flex items-center justify-center text-lg transition-all duration-200 rounded-xl focus:outline-none focus:primary-focus focus:ring-2 focus:ring-offset-2 disabled:bg-[#0D2132
] disabled: text-[#185686]">
                {children}
            </button>
        </div>
    );
}

export default SecondaryButton;