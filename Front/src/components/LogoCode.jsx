const LogoCode = () => {
  return (
    <>
    <div id="logo"
    className="mx-auto max-w-md min-w-[336px] hidden lg:flex items-center gap-2">
        <svg
        className="h-full z-40"
        xmlns="http://www.w3.org/2000/svg"
        width="65"
        height="64"
        viewBox="0 0 65 64"
        fill="none"
        >
        <path
            d="M53.0616 52.8C54.7896 52.8 56.2616 54.272 56.2616 56C56.2616 57.728 54.7896 59.2 53.0616 59.2H14.6616C12.9336 59.2 11.4616 57.728 11.4616 56C11.4616 54.272 12.9336 52.8 14.6616 52.8H53.0616ZM53.0616 48H14.6616C10.2776 48 6.66164 51.616 6.66164 56C6.66164 60.384 10.2776 64 14.6616 64H53.0616C55.1834 64 57.2182 63.1571 58.7185 61.6569C60.2188 60.1566 61.0616 58.1217 61.0616 56C61.0616 53.8783 60.2188 51.8434 58.7185 50.3431C57.2182 48.8429 55.1834 48 53.0616 48ZM61.0616 28.8H51.4616V16H35.4616L25.8616 28.8V44.8H64.2616L61.0616 28.8ZM30.7896 28.8L37.0616 20.8H45.0616V28.8H30.7896ZM25.0936 4.512L9.09364 0L0.261637 31.456C-0.826363 35.552 1.57364 39.808 5.70164 40.96L9.41364 41.984L19.9416 32.928L7.52564 29.472L13.5416 7.872L22.4696 10.368C24.2616 11.296 28.1336 13.888 30.5656 17.184L33.8616 12.8H35.2696C31.2376 7.712 25.3816 4.672 25.0936 4.512Z"
            fill="#FFE100"
        />
        </svg>
        <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-bold text-white">Maquinaria Pro</h1>
        <p className="text-xl text-primary-content font-light">Trabajo pesado a un clic</p>
        </div>
    </div>
    </>
  )
}
export default LogoCode