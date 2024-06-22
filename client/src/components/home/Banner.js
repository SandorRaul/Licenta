import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "./banner.css";
const data = [
    "./hoodie.jpeg",
    "./jeans.jpeg",
    "./polo.jpeg"
]
const Banner = () => {
  return (
    <Carousel
    className='carasousel'
    autoPlay={true}
    animation='slide'
    indicators={false}
    navButtonsAlwaysVisible={true}
    cycleNavigation={true}
    navButtonsProps={{
        style:{
        
            backGroundcolor:"#fff",
            color:"#49494",
            borderRadius:0,
            marginTop:-22,
            height:"104px"
        }
    }}
    >
        {
            data.map((imag,i)=>{
                return (
                    <>
                        <img src={imag} alt="" className='banner_img'/>
                    </>
                )
            })
        }
    </Carousel>
  )
}

export default Banner