import Image from "next/image";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
//import { useDebounce } from "../../hooks/useDebounce";
//import { useAppSelector, useTDispatch } from "../../hooks/redux";
//import { searchReducer } from "../../redux/application/actions";
import { Button, Input } from "..";
import searchIcon from "../../../assets/images/icons/search-icon.png";
import microphone from "../../../assets/images/icons/microphone.png";
import Link from "next/link";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";
import { IType } from "../../../models/IType";
import { IDevice } from "../../../models/IDevice";
import { useRouter } from "next/router";

const Search: React.FC = () => {
	const { search } = useActions();
  const [searchPattern, setSearchPattern] = useState<string>()
	const [isPending, startTransition] = useTransition();
  const { searchResults } = useTypedSelector((state) => state.app);
	const history = useRouter();

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(e.target.value);
    if (!e.target.value) {
      search("")
    }
		startTransition(() => {
			search(e.target.value);
		})
  };

	const linkHandler = (link: string) => {
		setSearchPattern("");
		search("");
		history.push(link);
	}

  return (
    <div className="search">
      <form className="search-form">
        <div className="search-form__input-wrapper">
          <Image
            src={searchIcon}
            alt="search-icon"
            className="search-icon icon"
          />
          <input
            type="text"
            className="search-form__input"
            name="search-input"
            onChange={onSearch}
            value={searchPattern}
            placeholder="Я шукаю..."
          />
          <button className="cancel-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button className="search-form__microphone">
            <Image
              src={microphone}
              alt="micro-btn"
              className="micro-btn icon"
            />
          </button>
        </div>
      </form>
      {searchResults && !!searchResults?.devices && !!searchResults?.types && (
        <div className="search-results">
          {!!searchResults?.devices?.length && (
            <div
              className="search-results__inner"
            >
              <div className="search-results__title">Товари</div>
              {searchResults.devices.map((device: IDevice) => (
								<div key={device._id } onClick={() => linkHandler(`/device/${device._id}`)} className="search-results__name">{device.name}</div>
              ))}
            </div>
          )}
          {!!searchResults?.types?.length && (
            <div
              className="search-results__inner"
            >
              <div className="search-results__title">Категорії</div>
              {searchResults.types.map((type: IType) => (
                  <div key={type._id } onClick={() => linkHandler(`/${type.value}`)} className="search-results__name">{type.name}</div>
              ))}
            </div>
          )}
					{
						!searchResults?.devices?.length && !searchResults?.types?.length && (
							<div className="nothing">По вашому запиту нічого не знайдено. Уточніть свій запит...</div>
						)
					}
        </div>
      )}
    </div>
  );
};
export default Search;
