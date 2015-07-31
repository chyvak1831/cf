$(document).ready(function(){
	// sticky_header
		var cubuk_seviye = $(document).scrollTop();
		var header_yuksekligi = $('.sticky_header').outerHeight();
		$(window).scroll(function() {
			var kaydirma_cubugu = $(document).scrollTop();
			if (kaydirma_cubugu > header_yuksekligi){$('.sticky_header').addClass('hide_header');} 
			else {$('.sticky_header').removeClass('hide_header');}
			if (kaydirma_cubugu > cubuk_seviye){$('.sticky_header').removeClass('show_header');} 
			else {$('.sticky_header').addClass('show_header');}
			cubuk_seviye = $(document).scrollTop();	
		});
	// END sticky_header


	// left mobile nav
		$('.jsBtNav').sidr();
		$("body").on("click",function(e) {
			$.sidr('close','sidr');
		});
	// END left mobile nav


	// jsListGrid
	function listGrid() {
		if ($( ".jsListBt" ).length) {
			$('.jsListBt').on("click",function() {
				$(this).addClass('active');
				$('.jsGridBt').removeClass('active');
				$('.jsListGrid').addClass('list_view');
			});
			$('.jsGridBt').on("click",function() {
				$(this).addClass('active');
				$('.jsListBt').removeClass('active');
				$('.jsListGrid').removeClass('list_view');
			})
		};
	}
	listGrid();
	// END jsListGrid


	// select value dropdown
	function selectValue() {
		if ($( ".jsDropdownToggle" ).length) {
			$('.jsDropdownToggle').on('click', 'li a', function(e){
				e.preventDefault();
				$(this).not('.jsNotSelectValue').closest('.dropdown').find('.jsSelectValue').text($(this).text());
			});
		};
	}
	selectValue();
	// END select value dropdown


	// customscrollbar
		function customScroll () {
			if ($( ".scroll_wrapper" ).length) {
				window.onload = function customScroll() {
					window.dima = baron({
						root: '.scroll_wrapper',
						scroller: '.scroller',
						bar: '.scroller_bar',
						barOnCls: 'baron'
					});
				};
			};
		}
		customScroll();
	// END customscrollbar


	// left nav in mobile - stop collapse dropdown when click 'more'
		$(document).on('click', '.dropdown-menu .sub_catg_see', function (e) {
			$(this) && e.stopPropagation(); // This replace if conditional.
		}); 
	// END left nav in mobile - stop collapse dropdown when click 'more'


	// savedItem();
		function savedItem() {
			$('.jsSaveBt').on( "click", function (e){
				e.preventDefault();
				$(this).find('.jsWrappSaveIcons').toggleClass('saved');
			})
		}
	// savedItem();


	// lising modal
		function modalQuickView () {
			function updateDataModal () {
				$('.jsModalQueickView .jsTitle').html($('.jsDealOpened .jsTitle').html());
				$('.jsModalQueickView .jsSomeTxt').html($('.jsDealOpened .jsSomeTxt').html());
				$('.jsModalQueickView .jsWhereWrote').html($('.jsDealOpened .jsWhereWrote').html());
				$('.jsModalQueickView .jsContentTxt').html($('.jsDealOpened .jsContentTxt').html());
				$('.jsModalQueickView .jsPrice').html($('.jsDealOpened .jsPrice').html());
				$('.jsModalQueickView .jsSave').html($('.jsDealOpened .jsSave').html());
				$('.jsModalQueickView .jsBookImg').attr('srcset', $('.jsDealOpened .jsBookImg').attr('srcset'));
				/*$('.jsDealerModal .jsDealerLink').attr('href', $('.jsDealerOpened').data('dealerlink'));*/
			}
			$('.jsQueickViewBt').on( 'click', function() {
				$(this).closest('.jsModalContent').addClass('jsDealOpened');
				updateDataModal ();
				$('.jsModalQueickView').modal('show');
				customScroll();
			})
			$('.jsModalQueickView').on('hide.bs.modal', function () {$('.jsDealOpened').removeClass('jsDealOpened');});
		}
		modalQuickView();
	// END lising modal


	// initial ajax load
		$("#dealerAllListings .jsAjaxTaget").load( "ajax_dealer_listing.php", function(){
			savedItem();
			listGrid();
			selectValue();
			modalQuickView();
		});
	// END initial ajax load


	$(".jsAjaxBt").on( "click", function (e){
		$('.jsAjaxBt').parents('li.active').removeClass('active');
		$(this).tab('show');
		if ($('.wrapp_dealer_listing').is(':visible')) {
			$('.jsMobileListing').removeClass('collapsed');
			$('.mobile_category_dealer').removeClass('hide');
		} else{
			$('.jsMobileListing').addClass('collapsed');
			$('.mobile_category_dealer').addClass('hide');
		};
		if ($('.dealer_catalogues').is(':visible')) {
			$('.jsMobileCatgBt').removeClass('collapsed');
		} else{
			$('.jsMobileCatgBt').addClass('collapsed');
		};

		e.preventDefault();
		$(".loading").show(); //show loading element
		var thisTab = $(this).data('target');
		var jsScrollTop = $('.jsScrollTop').position().top - 65;
		$(thisTab).find('.jsAjaxTaget').load($(this).attr('href'), function(){ //get content from PHP page
			$('html, body').animate({scrollTop:jsScrollTop}, 1000, 'swing', function() { 
				$(".loading").hide(); //once done, hide loading element
			});
			savedItem();
			listGrid();
			selectValue();
			modalQuickView();
		});

	});
	$('.jsMobileListing').on( "click", function (e){
		if (!$(this).hasClass('collapsed')) {
			e.preventDefault();
			$(this).addClass('collapsed');
			$('.wrapp_dealer_listing').removeClass('active');
			$('.mobile_category_dealer').addClass('hide');
		} else{
			e.preventDefault();
			$('.jsAllBt').click();
		};
	})
	$('.jsMobileCatgBt').on( "click", function (e){
		if (!$(this).hasClass('collapsed')) {
			e.preventDefault();
			$(this).addClass('collapsed');
			$('.dealer_catalogues').removeClass('active');
		} else{
			e.preventDefault();
			$('.jsCatalogFirst').click();
		};
	})
	$('.jsAboutMobileBt').on( "click", function (e){
		if (!$(this).hasClass('collapsed')) {
			e.preventDefault();
			$(this).addClass('collapsed');
			$('.author_about_us').removeClass('active')
		} else{
			e.preventDefault();
			$('.jsAboutBt').click();
		};
	})


	// rebuid on mobile
	function filterView() {
		if (window.matchMedia('(max-width: 767px)').matches) {
			$('.jsListingBtPC').children().detach().appendTo('.jsListingBtMobile');

		} else{
			$('.jsListingBtMobile').children().detach().appendTo('.jsListingBtPC');
		};
	}
	function allTabClosed() {
		if (window.matchMedia('(min-width: 768px)').matches && !$('.tab-pane').hasClass('active')) {
			$('.jsAllBt').click();
		}
	}
	filterView();
	allTabClosed();
	$(window).resize(function() {
		filterView();
		allTabClosed();
	})


	// ajax pagination
		$("#dealerAllListings").on( "click", ".pagination a", function (e){
			e.preventDefault();
			$(".loading").show(); //show loading element
			var jsScrollTop = $('.jsScrollTop').position().top - 65;
			var page = $(this).attr("data-page"); //get page number from link
			$("#dealerAllListings .jsAjaxTaget").load("ajax_dealer_listing.php",{"page":page}, function(){ //get content from PHP page
				$('html, body').animate({scrollTop:jsScrollTop}, 1000, 'swing', function() { 
					$(".loading").hide(); //once done, hide loading element
				});
				savedItem();
				listGrid();
				selectValue();
				modalQuickView();
			});

		});
	// END ajax pagination


	// social_list
		if ($( ".social_list" ).length) {
			$('.social_list [data-toggle="tooltip"]').tooltip({placement:'auto left'});
		};
	// social_list

});