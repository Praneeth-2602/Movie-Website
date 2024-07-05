import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { AiFillSetting, AiOutlineDiscord, AiOutlineLinkedin } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";
import { RiTelegramLine } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { FaArrowDown } from "react-icons/fa";
import Link from "next/link";

export default function contact() {
    return <>
        <div className="contactpage">
            <div className="contactcard">
                <div className="contactdesign">
                    <div className="topccard">
                        <div className="tcardsvg">
                            <HiMiniBars3BottomLeft />
                            <AiFillSetting />
                        </div>
                        <div className="usercoderimg">
                            <img src="/img/coder.png" alt="coder" />
                        </div>
                        <div className="usercoderinfo">
                            <h1>Praneeth Palugula</h1>
                            <h3>Web Developer</h3>
                            <div className="usercodersvg">
                                <Link href=''><AiOutlineLinkedin /></Link>
                                <Link href='https://www.instagram.com/just._.praneeth._'><IoLogoInstagram /></Link>
                                <Link href='https://www.discord.gg/just._.praneeth._'><AiOutlineDiscord /></Link>
                                <Link href='https://www.github.com/praneeth-2602'><SiGithub /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="bottomcard">
                        <Link href='/' className="followbtn">Follow</Link>
                        <div className="bcardtext">
                            <p>Learn More About My Profile</p>
                            <FaArrowDown/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}