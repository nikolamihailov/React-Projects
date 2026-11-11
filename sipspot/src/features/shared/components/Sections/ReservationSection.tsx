import { IoCallOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { barInfo } from "../../../../data/barInfo";
import SectionInfo from "../SectionInfo";
import Button from "../UI/Button/Button";
import Section from "../UI/Section/Section";

// "Book Reservation" call to action from project.txt - the hero and header link here (#reservation)
function ReservationSection() {
    return (
        <Section sectionClassName="reservation" id="reservation">
            <div className="reservation container">
                <div className="reservation__text">
                    <SectionInfo
                        subheading="Reservations"
                        heading="Your table is waiting"
                        description="Join us for an evening of slow-stirred classics and seasonal signatures. Walk-ins are welcome at the bar - for tables, we recommend booking ahead."
                        align="left"
                        onDark
                    />
                    <div className="reservation__btns">
                        <Button el="link" href={`tel:${barInfo.phone.replace(/\s/g, "")}`} type="medium" variant="secondary">
                            <IoCallOutline aria-hidden="true" /> Call to book
                        </Button>
                        <Button el="link" href={`mailto:${barInfo.email}`} type="medium" variant="light">
                            Email us
                        </Button>
                    </div>
                </div>

                <dl className="reservation__details">
                    <div className="reservation__detail">
                        <dt>
                            <IoTimeOutline aria-hidden="true" /> Opening hours
                        </dt>
                        {barInfo.openingHours.map((slot) => (
                            <dd key={slot.days}>
                                <span>{slot.days}</span>
                                <span>{slot.hours}</span>
                            </dd>
                        ))}
                    </div>
                    <div className="reservation__detail">
                        <dt>
                            <IoLocationOutline aria-hidden="true" /> Find us
                        </dt>
                        <dd>{barInfo.address}</dd>
                        <dd>{barInfo.phone}</dd>
                    </div>
                </dl>
            </div>
        </Section>
    );
}

export default ReservationSection;
