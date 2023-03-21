import Image from 'next/image';
import React from 'react';
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import telegram from '../../assets/images/telegram.png';
import cn from "classnames";

interface FooterProps {
	device?: boolean
}

const Footer: React.FC<FooterProps> = ({device}) => {
	return (
		<footer className={cn("footer", {"footer--device": device})}>
			<div className="container">
				<div className="footer__inner">
					<p className="text">Something</p>
					<ul className="social">
						<li className="social-item">
							<a href="#" className="social-item__link">
								<Image src={facebook} alt="facebook" className="icon" />
								<span>facebook</span>
							</a>
						</li>
						<li className="social-item">
							<a href="#" className="social-item__link">
								<Image src={instagram} alt="instagram" className="icon" />
								<span>instagram</span>
							</a>
						</li>
						<li className="social-item">
							<a href="#" className="social-item__link">
								<Image src={telegram} alt="telegram" className="icon" />
								<span>telegram</span>
							</a>
						</li>
					</ul>
					<ul className="contacts">
						<li className="contacts-item"><a href='tel:+380997580121' className="contacts-item__link">+380997580121</a></li>
						<li className="contacts-item"><a href='tel:+380997580121' className="contacts-item__link">+380997580121</a></li>
						<li className="contacts-item"><a href='musienko.com' className="contacts-item__link">musienko.com</a></li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

export default Footer;