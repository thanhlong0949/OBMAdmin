import React, {useMemo} from "react";
import {Avatar, Dropdown, Menu, Image} from "antd";
import {
  UserOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";
import {changeLang} from "@app/redux/slices/LanguageSlice";
import RouteList from "@app/routes/RouteList";
import {useRouter} from "next/router";
import {openModalConfirm} from "@app/components/ModalConfirm";
import {useTranslation} from "react-i18next";
import {uiLanguageOptions} from "@app/utils/constants/languageList";
import {toggleMenu} from "@app/redux/slices/MenuSlice";
import {logoutUser} from "@app/redux/slices/UserSlice";
import ApiUser, {IGetUserResponse} from "@app/api/ApiUser";
import {useQuery} from "react-query";
import {QUERY_KEY_USER} from "@app/api/keyQuery";

export default function Navbar(): JSX.Element {
  // const user = useSelector((state: IRootState) => state.user);
  const language = useSelector((state: IRootState) => state.language);
  const user = useSelector((state: IRootState) => state.user);

  console.log("user", user?.data?.name);
  const {i18n} = useTranslation();

  const router = useRouter();
  const {pathname} = router;

  const dispatch = useDispatch();
  const {isOpen} = useSelector((state: IRootState) => state.menu);

  const nameRouter = useMemo((): string[] => {
    const nameRouter: string[] = [];
    RouteList.forEach(({path, name, children}) => {
      if (path.split("/")[1] === pathname.split("/")[1]) {
        nameRouter.push(name);

        children?.forEach(({path, name, children}) => {
          if (path.split("/")[1] === pathname.split("/")[2])
            nameRouter.push(name);

          children?.forEach(({path, name}) => {
            if (path.split("/")[1] === pathname.split("/")[3])
              nameRouter.push(name);
          });
        });
      }
    });
    console.log("Route" + nameRouter);
    return nameRouter;
  }, [router]);

  const getDataUser = (): Promise<IGetUserResponse> => ApiUser.getUser();
  const dataUser = useQuery(QUERY_KEY_USER.GET_USER, getDataUser);

  const handleLogout = (): void => {
    openModalConfirm({
      title: "Bạn có muốn đăng xuất?",
      onOK: () => {
        dispatch(logoutUser());
        router.push("/login");
      },
    });
  };

  const selectLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    dispatch(changeLang(lang));
  };

  const menuUser = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <span onClick={handleLogout} role="button">
              Đăng xuất
            </span>
          ),
        },
      ]}
    />
  );

  const languageUi = uiLanguageOptions.filter(
    (item) => item.value === language.lang
  );

  const handleToggleSidebar = (): void => {
    dispatch(toggleMenu());
  };

  return (
    <div className="navbar">
      <div className="right-content-wrap">
        <div
          className="btn-togger-sidebar"
          onClick={handleToggleSidebar}
          role="button"
        >
          {isOpen ? (
            <MenuFoldOutlined style={{fontSize: "20px"}} />
          ) : (
            <MenuUnfoldOutlined style={{fontSize: "20px"}} />
          )}
        </div>
        <span>
          {nameRouter.map((item, index) => {
            if (index === nameRouter.length - 1)
              return (
                <span key={index} className="title title_focus">
                  {item}
                </span>
              );
            return <span key={index} className="title">{`${item} / `}</span>;
          })}
        </span>
      </div>
      <div className="left-content-wrap">
        {/* <Dropdown overlay={menuLang} className="select-lang" placement="bottom"> */}
        {/*  <span> */}
        {/*    Ngôn ngữ: */}
        {/*    <span className="lang">{languageUi[0].label}</span> */}
        {/*  </span> */}
        {/* </Dropdown> */}

        <span>
          <span style={{marginRight: 10, fontSize: 16}}>
            {user && user?.data?.name?.toUpperCase()}
          </span>
        </span>

        <Dropdown overlay={menuUser} placement="topLeft" className="user-wrap">
          <div>
            {dataUser.data?.response?.data?.url_image ? (
              <Image
                preview={false}
                width={30}
                height={30}
                src={dataUser.data?.response?.data?.url_image}
                style={{borderRadius: "50%"}}
              />
            ) : (
              <Avatar size="default" icon={<UserOutlined />} />
            )}

            <span className="user-name">
              {dataUser.data?.response?.data?.firstname}
            </span>
            <DownOutlined className="ml-2" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
