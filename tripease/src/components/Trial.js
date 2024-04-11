import React, { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import "./Trial.css"
export default function Trial()
{   
    useEffect(() => {
        const initCarousel = () => {
          const carousel = document.querySelector('.multi-item-carousel');
          const carouselInstance = new window.bootstrap.Carousel(carousel, {
            interval: false
          });
    
          const items = document.querySelectorAll('.multi-item-carousel .item');
          items.forEach(item => {
            let next = item.nextElementSibling;
            if (!next) {
              next = item.parentElement.firstElementChild;
            }
            item.appendChild(next.firstElementChild.cloneNode(true));
    
            if (next.nextElementSibling) {
              item.appendChild(next.nextElementSibling.firstElementChild.cloneNode(true));
            } else {
              item.appendChild(next.parentElement.firstElementChild.firstElementChild.cloneNode(true));
            }
          });
    
          return () => {
            carouselInstance.dispose();
          };
        };
    
        initCarousel();
      }, []);
    return(
        <>
        <div className="container">
  <h1>Use Bootstrap 3's carousel to show multiple items per slide.</h1>
  <div className="row">
    <div className="col-md-12">
      <div className="carousel slide multi-item-carousel" id="theCarousel">
        <div className="carousel-inner">
          <div className="item active">
            <div className="col-xs-4"><a href="#1"><img src="https://source.unsplash.com/300x300/?perth,australia" className="img-responsive"/></a></div>
          </div>
          <div className="item">
            <div className="col-xs-4"><a href="#1"><img src="https://source.unsplash.com/300x300/?fremantle,australia" className="img-responsive"/></a></div>
          </div>
          <div className="item">
            <div className="col-xs-4"><a href="#1"><img src="https://source.unsplash.com/300x300/?west-australia" className="img-responsive"/></a></div>
          </div>
          <div className="item">
            <div className="col-xs-4"><a href="#1"><img src="https://source.unsplash.com/300x300/?perth" className="img-responsive"/></a></div>
          </div>
          <div className="item">
            <div className="col-xs-4"><a href="#1"><img src="https://source.unsplash.com/300x300/?quokka,perth" className="img-responsive"/></a></div>
          </div>
          <div className="item">
            <div className="col-xs-4"><a href="#1"><img src="https://source.unsplash.com/300x300/?margaretriver,australia" className="img-responsive"/></a></div>
          </div>
          {/* add  more items here */}
          {/* Example item start: */}
          
          <div className="item">
            <div className="col-xs-4"><a href="#1"><img src="https://source.unsplash.com/300x300/?perth,australia&r=7" className="img-responsive"/></a></div>
          </div>
          
          {/*  Example item end */}
        </div>
        <a className="left carousel-control" href="#theCarousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
        <a className="right carousel-control" href="#theCarousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right"></i></a>
      </div>
    </div>
  </div>
</div>
        </>
)}