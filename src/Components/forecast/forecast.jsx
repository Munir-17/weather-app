import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import React from "react";
import "./forecast.css";

const WEEK_DAYS = [
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDate();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                   src={`icons/${item.weather[0].icon}.png`}
                   className="icon-small"
                   alt="weather"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-detail-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Wind Speed</label>
                  <label>{item.wind.speed}</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Sea Level</label>
                  <label>{item.main.sea_level}</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Feels Like</label>
                  <label>{item.main.feels_like} °C </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
