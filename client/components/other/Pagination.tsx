import Image from "next/image";
import ReactPaginate from "react-paginate";
import arrow from "../../assets/images/icons/arrow-left.png";
import { useActions } from "../../hooks/useAction";

interface PaginationProps {
	offset: number;
	pagesCount: number,
	onLoadMore?: () => void,
	className?: string,
}
const Pagination:React.FC<PaginationProps> = ({pagesCount, onLoadMore, className}) => {

	const { setOffset } = useActions();

	const onPageChange = (e: {selected: number}) => {
		const newOffset = 12 * e.selected;
		setOffset(newOffset);
	}
	
	return (
		<div className={`pagination--wrapper ${className ? className : ''}`}>
			{onLoadMore &&
			<div onClick={onLoadMore} className="load--more"><img src="/images/icons/load.svg"
				alt="load icon"/><span>Load more...</span>
			</div>
			}			
			{!onLoadMore && <ReactPaginate
				forcePage={0}
				pageCount={pagesCount}
				pageRangeDisplayed={1}
				containerClassName='pagination'
				pageClassName='pagination__item'
				breakClassName='pagination__item'
				previousClassName='pagination__item btn'
				nextClassName='pagination__item btn'
				activeClassName='pagination__item--active'
				onPageChange={onPageChange}
				previousLabel={<Image src={arrow} className="left-icon" alt="left-icon"/>}
				nextLabel={<Image src={arrow} className="right-icon" alt="right-icon"/>}
			/>}
		</div>
	)
}
export default Pagination;