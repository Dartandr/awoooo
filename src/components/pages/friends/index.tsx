import React from "react";
import style from "./index.module.scss";

const friendList = [
    {
        id: 1,
        nickname: "Akuma",
        isOnline: true,
        status: "Watching: Kill la Kill",
        img:
            "https://cdn.discordapp.com/attachments/530940222771560452/806131864284561408/Group.png",
    },
    {
        id: 2,
        nickname: "SpySandwich",
        isOnline: true,
        status: "Watching: Boku no Hero Academia",
        img:
            "https://cdn.discordapp.com/attachments/530940222771560452/805854678398402560/Group_9.png",
    },
    {
        id: 3,
        nickname: "Dacituri",
        isOnline: true,
        img:
            "https://cdn.discordapp.com/attachments/530940222771560452/805854679476338758/Group_10.png",
    },
    {
        id: 4,
        nickname: "SilvaDour",
        isOnline: false,
        wasOnline: "Last online 8 hrs ago",
        img:
            "https://cdn.discordapp.com/attachments/530940222771560452/805854682157285436/Group_12.png",
    },
    {
        id: 5,
        nickname: "Tubasas",
        isOnline: false,
        wasOnline: "Last online recently",
        img:
            "https://cdn.discordapp.com/attachments/530940222771560452/805854683586887690/Group_13.png",
    },
    {
        id: 6,
        nickname: "H3LLF4WK3R",
        isOnline: false,
        wasOnline: "Last online 6 month ago",
        img:
            "https://cdn.discordapp.com/attachments/530940222771560452/805854685029203978/Group_15.png",
    },
    {
        id: 7,
        nickname: "ダルタンヅル",
        isOnline: false,
        wasOnline: "Last online 8 hrs ago",
        img:
            "https://cdn.discordapp.com/attachments/530940222771560452/805854681057460265/Group_11.png",
    },
    {
        id: 8,
        nickname: "Idiot",
        isOnline: false,
        wasOnline: "Last online recently",
        img:
            "https://cdn.discordapp.com/attachments/530940222771560452/805854676360495154/Group_8.png",
    },
];

const Friends: React.FC = () => {
    const progressBar = () => {
        const progress = document.getElementsByClassName(style.scrollbar) as HTMLCollectionOf<HTMLElement>;
        const temp = document.getElementsByClassName(style.content) as HTMLCollectionOf<HTMLElement>;
        const scrollElement = temp[0];
        const scrollTop = scrollElement.scrollTop;
        const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
        const percent = (scrollTop / scrollHeight) * 100;
        progress[0].style.width = percent + "%";
        if (percent === 100) {
            progress[0].style.borderRadius = "0";
        } else {
            progress[0].style.borderRadius = "0 2px 2px 0";
        }
    }
    const friends = () => {
        const online: Array<JSX.Element> = [];
        const offline: Array<JSX.Element> = [];
        const element = friendList.map((element) => (
            <div
                className={style.friend}
                key={element.id}
                data-online={element.isOnline}
            >
                <img src={element.img} />
                <div className={style.friendData}>
                    <div className={style.friendNick}>{element.nickname}</div>
                    <div className={style.friendStatus}>
                        {element.status
                            ? element.status.length <= 26
                                ? element.status
                                : element.status.slice(0, 26) + "..."
                            : element.isOnline === true
                            ? "Online"
                            : element.wasOnline}
                    </div>
                </div>
            </div>
        ));
        element.forEach((element) => {
            if (element.props['data-online'] === true) {
                online.push(element);
            } else {
                offline.push(element);
            }
        });

        return (
            <div>
                <div className={style.friendsBlocks}>
                    <div className={style.friendsBlocksTitle}>Online</div>
                    <div className={style.friendsElements}>{online}</div>
                </div>
                <div className={style.friendsBlocks}>
                    <div className={style.friendsBlocksTitle}>Offline</div>
                    <div className={style.friendsElements}>{offline}</div>
                </div>
            </div>
        );
    };
        return (
            <div className={style.wrapper}>
                <div className={style.scrollbar} />
                <div className={style.header}>
                    <div className={style.userData}>
                        <div className={style.avatar}>
                            <img
                                src="https://cdn.discordapp.com/attachments/543797108973633557/583663720354545674/2019-05-13_23-07-13_0.png"
                                alt=""
                            />
                        </div>
                        <div className={style.nickname}>Dartandr</div>
                    </div>
                    <div
                        className={style.search}
                        onClick={() => {
                            alert("search");
                        }}
                    >
                        Search
                    </div>
                </div>
                <div className={style.spacingline} />
                <div className={style.content} onScroll={progressBar}>
                    {friends()}
                </div>
            </div>
        );

}

export default Friends;