import Menu from "../Menu/Menu"

const DondeEstamos = () => {
  return (
    <>
    <Menu></Menu>
    <div style={{width:'100vw'}}>
    <iframe style={{width:'100vw', height:'100vh'}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13401.792338120487!2d-68.84855602216352!3d-32.88631927964062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1717215843318!5m2!1ses-419!2sar"   loading="lazy"></iframe>
    </div>
    
    </>
  )
}

export default DondeEstamos
