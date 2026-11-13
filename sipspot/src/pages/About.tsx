import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { ABOUT_IMAGES, aboutStats, aboutTeam, aboutTimeline, aboutValues } from "@/data/about";
import { barInfo } from "@/data/barInfo";
import PageHeader from "@/features/shared/components/PageHeader/PageHeader";
import ReservationSection from "@/features/shared/components/ReservationSection/ReservationSection";
import SectionInfo from "@/features/shared/components/SectionInfo";
import Button from "@/features/shared/components/UI/Button/Button";

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease: "easeOut" },
};

function About() {
    return (
        <>
            <PageHeader
                eyebrow="Our story"
                title={`Raising the bar since ${barInfo.foundedYear}`}
                description="SipSpot began as twelve seats and a shared obsession with the perfect Daiquiri. A decade later, the obsession hasn't changed."
            />

            <section className="about-intro">
                <div className="about-intro__inner container">
                    <motion.div className="about-intro__media" {...fadeUp}>
                        <img
                            className="about-intro__img about-intro__img--primary"
                            src={ABOUT_IMAGES.primary}
                            alt="An Old Fashioned on the SipSpot bar"
                            loading="lazy"
                        />
                        <img
                            className="about-intro__img about-intro__img--secondary"
                            src={ABOUT_IMAGES.secondary}
                            alt=""
                            loading="lazy"
                        />
                        <span className="about-intro__since">
                            Est.
                            <strong>{barInfo.foundedYear}</strong>
                        </span>
                    </motion.div>

                    <motion.div className="about-intro__text" {...fadeUp}>
                        <SectionInfo
                            subheading="Who we are"
                            heading="A neighbourhood bar with grand ambitions"
                            align="left"
                        />
                        <p className="lede">
                            In {barInfo.foundedYear}, Anna and Leo left the hotel bars where they trained and opened a
                            place of their own: somewhere you could sit at the bar, talk to the person making your drink
                            and taste the difference that fresh juice and good ice make.
                        </p>
                        <p className="paragraph">
                            Today the room is bigger and the team has grown, but the idea is the same. We learn the
                            classics properly, we make what we can by hand, and we treat every guest like a regular.
                        </p>
                        <blockquote className="about-intro__quote">
                            <FaQuoteLeft aria-hidden="true" />
                            <p>A great cocktail is a small act of hospitality. We just try to do it a few hundred times a night.</p>
                            <cite>Anna Dimitrova, co-founder</cite>
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            <section className="about-stats" aria-label="SipSpot in numbers">
                <dl className="about-stats__grid container">
                    {aboutStats.map((stat) => (
                        <div key={stat.label} className="about-stats__item">
                            <dt>{stat.label}</dt>
                            <dd>{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section className="about-timeline">
                <div className="container">
                    <SectionInfo
                        subheading="Milestones"
                        heading="The journey so far"
                        description="From a twelve-seat bar to a city favourite - a few moments that shaped us."
                    />
                    <ol className="timeline">
                        {aboutTimeline.map((entry, index) => (
                            <motion.li
                                key={entry.year}
                                className="timeline__item"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                            >
                                <span className="timeline__year">{entry.year}</span>
                                <h3 className="timeline__title">{entry.title}</h3>
                                <p className="timeline__text">{entry.text}</p>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="about-values">
                <div className="container">
                    <SectionInfo
                        subheading="What we believe"
                        heading="Three things we never compromise on"
                    />
                    <ul className="about-values__grid">
                        {aboutValues.map((value, index) => (
                            <motion.li
                                key={value.title}
                                className="about-values__card"
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: index * 0.1 }}
                            >
                                <span className="about-values__number">0{index + 1}</span>
                                <h3 className="heading-tertiary">{value.title}</h3>
                                <p className="paragraph">{value.text}</p>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="about-team">
                <div className="container">
                    <SectionInfo
                        subheading="The team"
                        heading="The people behind the bar"
                        description="Twelve bartenders, one shared standard. Here are the three who set it."
                    />
                    <ul className="about-team__grid">
                        {aboutTeam.map((member) => (
                            <li key={member.name} className="about-team__member">
                                <span className="about-team__avatar" aria-hidden="true">
                                    {member.initials}
                                </span>
                                <h3 className="about-team__name">{member.name}</h3>
                                <p className="about-team__role">{member.role}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="about-team__cta">
                        <Button el="link" href="/recipes" type="medium" variant="outline">
                            Explore our menu
                        </Button>
                    </div>
                </div>
            </section>

            <ReservationSection />
        </>
    );
}

export default About;
