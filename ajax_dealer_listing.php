<?php
/* Title : Ajax Pagination with jQuery & PHP
Example URL : http://www.sanwebe.com/2013/03/ajax-pagination-with-jquery-php */

//continue only if $_POST is set and it is a Ajax request
if(isset($_POST) && isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
	
	include("dealer_config.php");  //include config file
	//Get page number from Ajax POST
	if(isset($_POST["page"])){
		$page_number = filter_var($_POST["page"], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_STRIP_HIGH); //filter number
		if(!is_numeric($page_number)){die('Invalid page number!');} //incase of invalid page number
	}else{
		$page_number = 1; //if there's no page number, set it to 1
	}
	
	//get total number of records from database for pagination
	$results = $mysqli_conn->query("SELECT COUNT(*) FROM paginate");
	$get_total_rows = $results->fetch_row(); //hold total records in variable
	//break records into pages
	$total_pages = ceil($get_total_rows[0]/$item_per_page);
	
	//get starting position to fetch the records
	$page_position = (($page_number-1) * $item_per_page);
	
	//SQL query that will fetch group of records depending on starting position and item per page. See SQL LIMIT clause
	$results = $mysqli_conn->query("SELECT id, name, message FROM paginate ORDER BY id ASC LIMIT $page_position, $item_per_page");
	
	//Display records fetched from database.
	while($row = $results->fetch_assoc()) {
		echo '<article class="col-md-4 col-xs-6 wrapper_product jsModalContent">
			<div class="box_product_item clearfix">
				<a href="productLink.com" class="box_flex_centered">
					<picture class="product_img">
						<source class="jsBookImg" srcset="images/listing/'.$row["id"].'.jpg, images/2x/listing/'.$row["id"].'.jpg 2x"></source>
						<img src="" alt="" class="img-responsive">
					</picture>
				</a>
				<div class="product_txt">
					<a href="productLink.com">
						<header>
							<h1 class="text-uppercase jsTitle">'.$row["name"].'</h1>
							<p class="category collapse jsSomeTxt">Grapefruit</p>
							<p class="where_wroten collapse jsWhereWrote">Tokyo: Wunternaum Press, 1964.</p>
							<span class="savebox jsSave jsSaveBt color_blue">
								<span class="jsWrappSaveIcons">
									<i class="fa fa-star-o jsSaveIcon"></i>
									<i class="fa fa-star jsSavedIcon"></i> Save
								</span>
							</span>
						</header>
						<div class="describe_txt jsContentTxt">'.$row["message"].'</div>
					</a>
					<footer class="clearfix">
						<span class="price jsPrice">$25,000</span>
						<ul class="full_quick_links color_blue list-inline">
							<li><a href="#bookModal" class="jsQueickViewBt">Quick View</a></li>
						</ul>
					</footer>
				</div>
			</div>
		</article>';
	}
	

	/* We call the pagination function here to generate Pagination link for us. 
	As you can see I have passed several parameters to the function. */
	echo paginate_function($item_per_page, $page_number, $get_total_rows[0], $total_pages);
}
################ pagination function #########################################
function paginate_function($item_per_page, $current_page, $total_records, $total_pages)
{
    $pagination = '';
    if($total_pages > 0 && $total_pages != 1 && $current_page <= $total_pages){ //verify total pages and current page number
        $pagination .= '<ul class="pagination clearfix col-xs-12">';
        
        $right_links    = $current_page + 3;
        $previous       = $current_page - 3; //previous link 
        $next           = $current_page + 1; //next link
        $first_link     = true; //boolean var to decide our first link
        
        if($current_page > 1){
			$previous_link = ($previous==0)?1:$previous;
            $pagination .= '<li class="first"><a href="#" data-page="1" title="First">&laquo;</a></li>'; //first link
            $pagination .= '<li><a href="#" data-page="'.$previous_link.'" title="Previous">&lt;</a></li>'; //previous link
                for($i = ($current_page-2); $i < $current_page; $i++){ //Create left-hand side links
                    if($i > 0){
                        $pagination .= '<li><a href="#" data-page="'.$i.'" title="Page'.$i.'">'.$i.'</a></li>';
                    }
                }   
            $first_link = false; //set first link to false
        }
        
        if($first_link){ //if current active page is first link
            $pagination .= '<li class="first active"><span>'.$current_page.'</span></li>';
        }elseif($current_page == $total_pages){ //if it's the last active link
            $pagination .= '<li class="last active"><span>'.$current_page.'</span></li>';
        }else{ //regular current link
            $pagination .= '<li class="active"><span>'.$current_page.'</span></li>';
        }
                
        for($i = $current_page+1; $i < $right_links ; $i++){ //create right-hand side links
            if($i<=$total_pages){
                $pagination .= '<li><a href="#" data-page="'.$i.'" title="Page '.$i.'">'.$i.'</a></li>';
            }
        }
        if($current_page < $total_pages){ 
				$next_link = ($i > $total_pages)? $total_pages : $i;
                $pagination .= '<li><a href="#" data-page="'.$next_link.'" title="Next">&gt;</a></li>'; //next link
                $pagination .= '<li class="last"><a href="#" data-page="'.$total_pages.'" title="Last">&raquo;</a></li>'; //last link
        }
        
        $pagination .= '</ul>'; 
    }
    return $pagination; //return pagination links
}
?>

