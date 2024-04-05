import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CONSTANTS from '../../constants';
import styles from './InformationPage.module.sass';

const InformationPage = () => {
  const [openContainer, setOpenContainer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cursorOnModal, setCursorOnModal] = useState(false);

  const toggleTextVisibility = (containerId) => {
    setOpenContainer(containerId === openContainer ? null : containerId);
  };

  const openModal = () => {
    const modal = document.querySelector(`.${styles.containerSpace8}`);
    modal.style.display = 'block';
    setModalOpen(true);
  };

  const closeModal = () => {
    const modal = document.querySelector(`.${styles.containerSpace8}`);
    modal.style.display = 'none';
    setModalOpen(false);
  };

  const handleMouseEnterModal = () => {
    setCursorOnModal(true);
  };

  const handleMouseLeaveModal = () => {
    setCursorOnModal(false);
  };

  useEffect(() => {
    const handleScroll = (event) => {
      if (cursorOnModal) {
        const modalContainer = document.querySelector(
          `.${styles.space8ModalContainer}`
        );
        if (modalContainer) {
          modalContainer.scrollTop += event.deltaY;
        }
      } else {
        window.scrollBy(0, event.deltaY);
      }
    };
    document.addEventListener('wheel', handleScroll);

    return () => {
      document.removeEventListener('wheel', handleScroll);
    };
  }, [cursorOnModal]);

  return (
    <>
      <Header />
      <div className={styles.sharedContainer}>
        <div className={styles.containerSpace1}>
          <div className={styles.space1InnerContainer}>
            <span className={styles.space1NotBtn}>
              World's #1 Naming Platform
            </span>
            <div className={styles.space1TextContainer}>
              <h1 className={styles.h1Space1Text}>How Does Squadhelp Work?</h1>
              <p className={styles.space1Text}>
                Squadhelp helps you come up with a great name for your business
                by combining the power of crowdsourcing with sophisticated
                technology and Agency-level validation services.
              </p>
            </div>
            <div className={styles.space1ButtonContainer}>
              <Link
                className={styles.space1ButtonPlayVideo}
                to="https://vimeo.com/826948811"
              >
                <small id={styles.btnPlayVideo} className="fas fa-play"></small>
                Play Video
              </Link>
            </div>
          </div>
          <div className={styles.space1ImgContainer}>
            <img
              className={styles.space1Img1}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}app-user.svg`}
              alt="drawing"
            />
          </div>
        </div>
        <div className={styles.containerSpace2}>
          <div className={styles.space2TextContainer}>
            <span className={styles.space2NotBtn}>Our Services</span>
            <h2 className={styles.h2Space2Text}>3 Ways To Use Squadhelp</h2>
            <p className={styles.space2Text}>
              Squadhelp offers 3 ways to get you a perfect name for your
              business.
            </p>
          </div>
          <div className={styles.space2InnerContainer}>
            <div className={styles.space2InfoContainer}>
              <div className={styles.space2InfoTextContainer}>
                <img
                  className={styles.space2ImgIcon}
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}creativeExperts.png`}
                  alt="creative experts"
                />
                <h3 className={styles.h3Space2Text}>Launch a Contest</h3>
                <p className={styles.space2InfoText}>
                  Work with hundreds of creative experts to get custom name
                  suggestions for your business or brand. All names are
                  auto-checked for URL availability.
                </p>
              </div>
              <Link className={styles.btn__linkInfo} to="/">
                Launch a Contest
              </Link>
            </div>
            <div className={styles.space2InfoContainer}>
              <div className={styles.space2InfoTextContainer}>
                <img
                  className={styles.space2ImgIcon}
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}readyData.png`}
                  alt="ready data"
                />
                <h3 className={styles.h3Space2Text}>Explore Names For Sale</h3>
                <p className={styles.space2InfoText}>
                  Our branding team has curated thousands of pre-made names that
                  you can purchase instantly. All names include a matching URL
                  and a complimentary Logo Design.
                </p>
              </div>
              <Link className={styles.btn__linkInfo} to="/">
                Explore Names For Sale
              </Link>
            </div>
            <div className={styles.space2InfoContainer}>
              <div className={styles.space2InfoTextContainer}>
                <img
                  className={styles.space2ImgIcon}
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}newIdea.png`}
                  alt="new idea"
                />
                <h3 className={styles.h3Space2Text}>
                  Agency-level Managed Contests
                </h3>
                <p className={styles.space2InfoText}>
                  Our Managed contests combine the power of crowdsourcing with
                  the rich experience of our branding consultants. Get a
                  complete agency-level experience at a fraction of Agency
                  costs.
                </p>
              </div>
              <Link className={styles.btn__linkInfo} to="/">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.containerSpace3}>
          <div className={styles.space3TextContainer}>
            <img
              className={styles.space3ImgIcon1}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}prizeCup.png`}
              alt="prize cup"
            />
            <h2 className={styles.h2Space3Text}>
              How Do Naming Contests Work?
            </h2>
          </div>
          <div className={styles.space3InnerContainer}>
            <div className={styles.space3ListContainer}>
              <ul className={styles.space3List}>
                <li className={styles.space3ListItem}>
                  <div className={styles.space3ContanierListItem}>
                    <div className={styles.space3NumberContanierListItem}>
                      <span className={styles.space3ListItemText1}>1.</span>
                    </div>
                    <div className={styles.space3TextContanierListItem}>
                      <p className={styles.space3ListItemText2}>
                        Fill out your Naming Brief and begin receiving name
                        ideas in minutes
                      </p>
                    </div>
                  </div>
                </li>
                <li className={styles.space3ListItem}>
                  <div className={styles.space3ContanierListItem}>
                    <div className={styles.space3NumberContanierListItem}>
                      <span className={styles.space3ListItemText1}>2.</span>
                    </div>
                    <div className={styles.space3TextContanierListItem}>
                      <p className={styles.space3ListItemText2}>
                        Rate the submissions and provide feedback to creatives.
                        Creatives submit even more names based on your feedback.
                      </p>
                    </div>
                  </div>
                </li>
                <li className={styles.space3ListItem}>
                  <div className={styles.space3ContanierListItem}>
                    <div className={styles.space3NumberContanierListItem}>
                      <span className={styles.space3ListItemText1}>3.</span>
                    </div>
                    <div className={styles.space3TextContanierListItem}>
                      <p className={styles.space3ListItemText2}>
                        Our team helps you test your favorite names with your
                        target audience. We also assist with Trademark
                        screening.
                      </p>
                    </div>
                  </div>
                </li>
                <li className={styles.space3ListItem}>
                  <div className={styles.space3ContanierListItem}>
                    <div className={styles.space3NumberContanierListItem}>
                      <span className={styles.space3ListItemText1}>4.</span>
                    </div>
                    <div className={styles.space3TextContanierListItem}>
                      <p className={styles.space3ListItemText2}>
                        Pick a Winner. The winner gets paid for their
                        submission.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.space3ImgContainer}>
              <img
                className={styles.space3Img2}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}home-Office.svg`}
                alt="home Office"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.containerSpace4}>
          <div className={styles.space4StickyContainer}>
            <nav className={styles.space4StickyBlock}>
              <ul className={styles.stickyList}>
                <li>
                  <a className={styles.stickyListLink} href="#contests">
                    Launching A Contest
                  </a>
                </li>
                <li>
                  <a className={styles.stickyListLink} href="#marketplace">
                    Buying From Marketplace
                  </a>
                </li>
                <li>
                  <a className={styles.stickyListLink} href="#managed">
                    Managed Contests
                  </a>
                </li>
                <li>
                  <a className={styles.stickyListLink} href="#creatives">
                    For Creatives
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.space4InfoContainer}>
            <div id="contests" className={styles.space4InfoItemContainer}>
              <div className={styles.space4InfoTitleContainer}>
                <h3 className={styles.h3Space4Title}>Launching A Contest</h3>
              </div>
              <div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line1')}
                      >
                        How long does it take to start receiving submissions?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line1',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line1',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      For Naming contests, you will start receiving your
                      submissions within few minutes of launching your contest.
                      Since our creatives are located across the globe, you can
                      expect to receive submissions 24 X 7 throughout the
                      duration of the brainstorming phase.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line2')}
                      >
                        How long do Naming Contests last?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line2',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line2',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      You can choose a duration from 1 day to 7 days. We
                      recommend a duration of 3 Days or 5 Days. This allows for
                      sufficient time for entry submission as well as
                      brainstorming with creatives. If you take advantage of our
                      validation services such as Audience Testing and Trademark
                      Research, both will be an additional 4-7 days (3-5
                      business days for Audience Testing and 1-2 business days
                      for Trademark Research).
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line3')}
                      >
                        Where are the creatives located?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line3',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line3',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      About 70% of our Creatives are located in the United
                      States and other English speaking countries (i.e. United
                      Kingdom, Canada, and Australia.). We utilize an advanced
                      rating score algorithm to ensure that high quality
                      creatives receive more opportunities to participate in our
                      contests.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line4')}
                      >
                        What if I do not like any submissions?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line4',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line4',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      While it is unusually rare that you will not like any
                      names provided, we have a few options in case this problem
                      occurs:
                      <ul className={styles.space4TextList1}>
                        <li>
                          If the contest ends and you have not yet found a name
                          that you’d like to move forward with, we can provide
                          complimentary extension of your contest as well as a
                          complimentary consultation with one of our branding
                          consultants (a $99 value).
                        </li>
                        <li>
                          By exploring our premium domain marketplace you can
                          apply the contest award towards the purchase of any
                          name listed for sale.
                        </li>
                        <li>
                          If you choose the Gold package or Platinum package and
                          keep the contest as "Not Guaranteed", you can request
                          a partial refund if you choose not to move forward
                          with any name from you project. (Please note that the
                          refund is for the contest award). Here is a link to
                          our{' '}
                          <a href="https://helpdesk.squadhelp.com/en/articles/115621-refund-policy">
                            Refund Policy
                          </a>
                          .
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line5')}
                      >
                        How much does it cost?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line5',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line5',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      Our naming competitions start at $299, and our logo design
                      competitions start at $299. Also, there are three
                      additional contest level that each offer more features and
                      benefits. See our <a href="/">Pricing Page</a> for
                      details.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line6')}
                      >
                        I need both a Name and a Logo. Do you offer any discount
                        for multiple contests?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line6',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line6',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      Yes! We have many contest bundles - our most popular being
                      our Name, Tagline, and Logo bundle. Bundles allow you to
                      purchase multiple contests at one time and save as much as
                      from $75 - $400. You can learn more about our bundle
                      options on our <a href="/">Pricing Page</a>.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line7')}
                      >
                        What if I want to keep my business idea private?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line7',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line7',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      You can select a Non Disclosure Agreement (NDA) option at
                      the time of launching your competition. This will ensure
                      that only those contestants who agree to the NDA will be
                      able to read your project brief and participate in the
                      contest. The contest details will be kept private from
                      other users, as well as search engines.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line8')}
                      >
                        Can you serve customers outside the US?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line8',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line8',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      Absolutely. Squadhelp services organizations across the
                      globe. Our customer come from many countries, such as the
                      United States, Australia, Canada, Europe, India, and MENA.
                      We've helped more than 25,000 customer around the world.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section1Line9')}
                      >
                        Can I see any examples?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section1Line9',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section1Line9',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      Our creatives have submitted more than 6 Million names and
                      thousands of logos on our platform. Here are some examples
                      of Names, Taglines, and Logos that were submitted in
                      recent contests.
                      <ul className={styles.space4TextList1}>
                        <li>
                          <a href="/">Name Examples</a>
                        </li>
                        <li>
                          <a href="/">Tagline Examples</a>
                        </li>
                        <li>
                          <a href="/">Logo Examples</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div id="marketplace" className={styles.space4InfoItemContainer}>
              <div className={styles.space4InfoTitleContainer}>
                <h3 className={styles.h3Space4Title}>
                  Buying From Marketplace
                </h3>
              </div>
              <div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section2Line1')}
                      >
                        What's included with a Domain Purchase?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section2Line1',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section2Line1',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      When you purchase a domain from our premium domain
                      marketplace, you will receive the exact match .com URL, a
                      complimentary logo design (along with all source files),
                      as well as a complimentary Trademark report and Audience
                      Testing if you’re interested in validating your name.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section2Line2')}
                      >
                        How does the Domain transfer process work?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section2Line2',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section2Line2',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      Once you purchase a Domain, our transfer specialists will
                      reach out to you (typically on the same business day). In
                      most cases we can transfer the domain to your preferred
                      registrar (such as GoDaddy). Once we confirm the transfer
                      details with you, the transfers are typically initiated to
                      your account within 1 business day.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section2Line3')}
                      >
                        If I purchase a Domain on installments, can I start
                        using it to setup my website?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section2Line3',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section2Line3',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      We offer payment plans for many domains in our
                      Marketplace. If you purchase a domain on a payment plan,
                      we hold the domain in an Escrow account until it is fully
                      paid off. However our team can assist you with making any
                      changes to the domains (such as Nameserver changes), so
                      that you can start using the domain right away after
                      making your first installment payment.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div id="managed" className={styles.space4InfoItemContainer}>
              <div className={styles.space4InfoTitleContainer}>
                <h3 className={styles.h3Space4Title}>Managed Contests</h3>
              </div>
              <div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section3Line1')}
                      >
                        What are Managed Contests?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section3Line1',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section3Line1',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      The 'Managed' option is a fully managed service by
                      Squadhelp Branding experts. It includes a formal brief
                      preparation by Squadhelp team and management of your
                      contest. Managed Contests are a great fit for companies
                      that are looking for an "Agency" like experience and they
                      do not want to manage the contest directly.
                      <br />
                      Our branding team has directly managed hundreds of
                      branding projects and has learned several best practices
                      that lead to successful project outcomes. Our team will
                      apply all best practices towards the management of your
                      branding project.
                      <br />
                      Learn more about our{' '}
                      <a href="/">Managed Contest Service</a>
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section3Line2')}
                      >
                        What's a typical timeline for a Managed Contest?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section3Line2',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section3Line2',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      The overall process takes 12-13 days.
                      <ul className={styles.space4TextList1}>
                        <li>
                          The Managed projects start with a project kick-off
                          call with your Branding Consultant. You can schedule
                          this call online immediately after making your
                          payment.
                        </li>
                        <li>
                          After your kick-off call, the Branding consultant will
                          write your project brief and send for your approval
                          within 1 business day.
                        </li>
                        <li>
                          Upon your approval, the contest will go live. The
                          branding consultant will help manage your project
                          throughout the brainstorming phase (typically 5 days).
                        </li>
                        <li>
                          Upon the completion of brainstorming phase, the
                          branding consultant will work with you to test the top
                          6 names from your Shortlist (3-5 Days). In addition,
                          the branding consultant will coordinate the detailed
                          Trademark screening (1-3 days).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section3Line3')}
                      >
                        How much do Managed Contests cost?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section3Line3',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section3Line3',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      We offer two levels of Managed Contests. Standard ($1499)
                      and Enterprise ($2999). The Enterprise managed contest
                      includes:
                      <ul className={styles.space4TextList1}>
                        <li>
                          (1) a $500 award amount (instead of $300), which will
                          attract our top Creatives and provide more options to
                          choose from;
                        </li>
                        <li>
                          (2) we will ensure a senior member of our branding
                          team is assigned to your project and the branding team
                          will invest about 3X more time in the day-to-day
                          management of your project;
                        </li>
                        <li>
                          (3) you will receive more high-end trademark report
                          and 5X more responses for your audience test.
                        </li>
                        <li>
                          Here is a link to our <a href="/">Pricing page</a>{' '}
                          with a detailed comparison of the two packages.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section3Line4')}
                      >
                        Where are the Branding Consultants located?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section3Line4',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section3Line4',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      All our branding consultants are based in in our
                      Headquarters (Hoffman Estates, IL). Our branding
                      consultants have many years of experience in managing
                      hundreds of branding projects for companies ranging from
                      early stage startups to Fortune 500 corporations.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div id="creatives" className={styles.space4InfoItemContainer}>
              <div className={styles.space4InfoTitleContainer}>
                <h3 className={styles.h3Space4Title}>For Creatives</h3>
              </div>
              <div className={styles.space4InfoTextContainer}>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section4Line1')}
                      >
                        Can anyone join your platform?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section4Line1',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section4Line1',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      We are open to anyone to signup. However, we have an
                      extensive "<a href="/">Quality Scoring</a>" process which
                      ensures that high quality creatives have the ability to
                      continue to participate in the platform. On the other
                      hand, we limit the participation from those creatives who
                      do not consistently receive high ratings.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section4Line2')}
                      >
                        Can I start participating immediately upon signing up?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section4Line2',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section4Line2',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      When you initially signup, you are assigned few contests
                      to assess your overall quality of submissions. Based upon
                      the quality of your submissions, you will continue to be
                      assigned additional contests. Once you have received
                      enough high ratings on your submissions, your account will
                      be upgraded to "Full Access", so that you can begin
                      participating in all open contests.
                    </div>
                  </div>
                </div>
                <div className={styles.space4DropDownContainer}>
                  <div className={styles.space4CollapsedContainer}>
                    <h5 className={styles.h5Space4}>
                      <button
                        className={styles.space4FalceBtn}
                        onClick={() => toggleTextVisibility('section4Line3')}
                      >
                        How Do I Get Paid?
                        <span
                          id={styles.spase4Arrow}
                          className={classNames('fas fa-arrow-right small', {
                            [styles.rotated]: openContainer === 'section4Line3',
                          })}
                        ></span>
                      </button>
                    </h5>
                  </div>
                  <div
                    className={classNames(styles.space4TextContainer, {
                      [styles.show]: openContainer === 'section4Line3',
                    })}
                  >
                    <div className={styles.space4TextInnerContainer}>
                      We handle creative payouts via Paypal or Payoneer.
                      Depending upon your country of residence, we may require
                      additional documentation to verify your identity as well
                      as your Tax status.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.containerSpace5}>
          <div className={styles.space5ImgInfoContainer}>
            <h3 className={styles.h3Space5Text}>Ready to get started?</h3>
            <p className={styles.space5Text}>
              Fill out your contest brief and begin receiving custom name
              suggestions within minutes.
            </p>
            <a className={styles.space5StartBtn} href="/">
              Start A Contest
            </a>
          </div>
          <img
            className={styles.space5Img1}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}abstractImg1.svg`}
            alt="abstract drawing"
          />
          <img
            className={styles.space5Img2}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}abstractImg2.svg`}
            alt="abstract drawing"
          />
        </div>
        <div className={styles.containerSpace6}>
          <div className={styles.space6InnerContainer}>
            <div className={styles.space6ImgContainer}>
              <img
                className={styles.space6Img}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}goldStar.svg`}
                alt="star"
              />
              <p className={styles.space6Text}>
                <span className={styles.space6BoldText}>
                  4.9 out of 5 stars
                </span>{' '}
                from 25,000+ customers.
              </p>
            </div>
          </div>
          <div className={styles.space6InnerContainer}>
            <div className={styles.space6ImgContainer}>
              <img
                className={styles.space6ImgCentral}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}people.svg`}
                alt="people"
              />
              <p className={styles.space6Text}>
                Our branding community stands{' '}
                <span className={styles.space6BoldText}>200,000+</span> strong.
              </p>
            </div>
          </div>
          <div className={styles.space6InnerContainer}>
            <div className={styles.space6ImgContainer}>
              <img
                className={styles.space6Img}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.svg`}
                alt="sharing files"
              />
              <p className={styles.space6Text}>
                <span className={styles.space6BoldText}>140+ Industries</span>{' '}
                supported across more than{' '}
                <span className={styles.space6BoldText}>85 countries</span>
                <br />– and counting.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.containerSpace7}>
          <div className={styles.space7TextContainer}>
            <ul className={styles.space7List1}>
              <li className={styles.space7Item1List1}>
                <span className={styles.space7FalceBtn}>
                  <span
                    id={styles.space7BtnIcon}
                    className="fas fa-angle-right btn-icon__inner"
                  ></span>
                </span>
                <div className={styles.space7InnerTextContainer}>
                  <h4 className={styles.h4Space7Text}>
                    Pay a Fraction of cost vs hiring an agency
                  </h4>
                  <p className={styles.space7Section1Text}>
                    For as low as $199, our naming contests and marketplace
                    allow you to get an amazing brand quickly and affordably.
                  </p>
                </div>
              </li>
              <li className={styles.space7Item2List1}></li>
              <li className={styles.space7Item1List1}>
                <span className={styles.space7FalceBtn}>
                  <span
                    id={styles.space7BtnIcon}
                    className="fas fa-angle-right btn-icon__inner"
                  ></span>
                </span>
                <div className={styles.space7InnerTextContainer}>
                  <h4 className={styles.h4Space7Text}>
                    Satisfaction Guarantee
                  </h4>
                  <p className={styles.space7Section1Text}>
                    Of course! We have policies in place to ensure that you are
                    satisfied with your experience.{' '}
                    <a href="#SatisfactionGuarantee" onClick={openModal}>
                      Learn more
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.space7BannerContainer}>
            <div className={styles.space7InnerBannerContainer}>
              <ul className={styles.space7List2}>
                <li className={styles.space7ItemList2}>
                  <div className={styles.space7BannerInfoContainer}>
                    <h4 className={styles.h4Space7Banner}>Questions?</h4>
                    <p className={styles.space7Section2Text}>
                      Speak with a Squadhelp platform expert to learn more and
                      get your questions answered.
                    </p>
                    <button className={styles.space7Btn}>
                      Schedule Consultation
                    </button>
                    <br />
                    <br />
                    <a href="/" className={styles.space7Link2}>
                      <img
                        className={styles.space7Img}
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}phone_icon.svg`}
                        alt="phone icon"
                      />
                      &nbsp; (877) 355-3585
                    </a>
                    <br />
                    <span className={styles.space7SpanText}>
                      Call us for assistance
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {modalOpen && (
          <div
            className={styles.overlay}
            onClick={closeModal}
            onMouseEnter={handleMouseEnterModal}
            onMouseLeave={handleMouseLeaveModal}
          ></div>
        )}
        <div
          id="SatisfactionGuarantee"
          className={classNames(styles.containerSpace8, {
            [styles.modalOpen]: modalOpen,
          })}
        >
          <div
            className={styles.space8ModalContainer}
            onMouseEnter={handleMouseEnterModal}
            onMouseLeave={handleMouseLeaveModal}
          >
            <div className={styles.space8ModalInfoContainer}>
              <h4 className={styles.h4Space8}>We Stand By Our Process.</h4>
              <p className={styles.space8Text}>
                If you are not satisfied receive
              </p>
              <ul>
                <li className={styles.space8ItemList}>
                  <div className={styles.space8InnerListContainer}>
                    <span className={styles.space8Icon1Modal}>
                      <span
                        id={styles.space8Icon}
                        className="fas fa-heart btn-icon__inner"
                      ></span>
                    </span>
                    <div className={styles.space8TextContainer}>
                      Complimentary extension of your contest timeline.
                    </div>
                  </div>
                </li>
                <li className={styles.space8ItemList}>
                  <div className={styles.space8InnerListContainer}>
                    <span className={styles.space8Icon2Modal}>
                      <span
                        id={styles.space8Icon}
                        className="fas fa-smile btn-icon__inner"
                      ></span>
                    </span>
                    <div className={styles.space8TextContainer}>
                      Complimentary consultation with a Squadhelp branding
                      consultant.
                    </div>
                  </div>
                </li>
                <li className={styles.space8ItemList}>
                  <div className={styles.space8InnerListContainer}>
                    <span className={styles.space8Icon3Modal}>
                      <span
                        id={styles.space8Icon}
                        className="fab fa-studiovinari btn-icon__inner"
                      ></span>
                    </span>
                    <div className={styles.space8TextContainer}>
                      Apply your contest award toward the purchase of any
                      premium name from our Marketplace.
                    </div>
                  </div>
                </li>
                <li className={styles.space8ItemList}>
                  <div className={styles.space8InnerListContainer}>
                    <span className={styles.space8Icon1Modal}>
                      <span
                        id={styles.space8Icon}
                        className="fab fa-steam-symbol btn-icon__inner"
                      ></span>
                    </span>
                    <div className={styles.space8TextContainer}>
                      Partial refund for Gold and Platinum packages.{' '}
                      <a href="/">Read more.</a>
                    </div>
                  </div>
                </li>
                <li className={styles.space8ItemList}>
                  <div className={styles.space8InnerListContainer}>
                    <span className={styles.space8Icon2Modal}>
                      <span
                        id={styles.space8Icon}
                        className="fas fa-table-tennis btn-icon__inner"
                      ></span>
                    </span>
                    <div className={styles.space8TextContainer}>
                      No-questions-asked refund within 10 days for any
                      marketplace domains purchased. <a href="/">Read more.</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.space8ModalBtnContainer}>
              <button className={styles.space8Btn} onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
        <div className={styles.containerSpace9}>
          <div className={styles.space9Section1Container}>
            <h6 className={styles.h6Space9Text}>Featured In</h6>
          </div>
          <div className={styles.space9Section2Container}>
            <div className={styles.space9Section2InnerContainer}>
              <div className={styles.space9LabelContainer}>
                <a
                  className={styles.space9Link}
                  href="http://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199"
                >
                  <img
                    className={styles.space9Img}
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}forbes.svg`}
                    alt="forbes"
                  />
                </a>
              </div>
              <div className={styles.space9LabelContainer}>
                <a
                  className={styles.space9Link}
                  href="https://thenextweb.com/news/changing-startups-name-tale-crowdsourcing-843-domain-names"
                >
                  <img
                    className={styles.space9Img}
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}TNW.svg`}
                    alt="TNW"
                  />
                </a>
              </div>
              <div className={styles.space9LabelContainer}>
                <a
                  className={styles.space9Link}
                  href="http://www.chicagotribune.com/bluesky/originals/ct-squadhelp-startup-names-bsi-20170331-story.html"
                >
                  <img
                    className={styles.space9Img}
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}chicago.svg`}
                    alt="chicago tribune"
                  />
                </a>
              </div>
              <div className={styles.space9LabelContainer}>
                <a
                  className={styles.space9Link}
                  href="http://mashable.com/2011/04/01/make-money-crowdworking/"
                >
                  <img
                    className={styles.space9Img}
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}mashable.svg`}
                    alt="mashable"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InformationPage;
