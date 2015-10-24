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
	(function customScroll () {
		if ($( ".scroll_wrapper" ).length) {
			window.onload = function () {
				window.dima = baron({
					root: '.scroll_wrapper',
					scroller: '.scroller',
					bar: '.scroller_bar',
					barOnCls: 'baron'
				});
			};
		};
	})();
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
	// END social_list


	// catalog modal content height
		function heightModalCatalog() {
			var heightModalScroll = $(window).height() - $('.jsModalFullHeight.in .modal-header').outerHeight() - $('.jsModalFullHeight.in .modal-footer').outerHeight();
			if (window.matchMedia('(min-width: 992px)').matches) {
				$('.jsModalFullHeight.in .scroller').css('height', heightModalScroll - 60);
			}
			if (window.matchMedia('(max-width: 991px)').matches) {
				$('.jsModalFullHeight.in .scroller').css('height', heightModalScroll - 20);
			}
		}
		$(window).resize(function() {
			heightModalCatalog();
		});
		$('.jsModalFullHeight').on('shown.bs.modal', function () {
			heightModalCatalog();
			window.dima.update();
		})
	// END catalog modal content height


	// top dropdowns
	$('.jsMegaDropBt').on('click', function (e) {
		e.preventDefault();
		var parentBt = $(this).parent('.jsMegaDrop');
		$('.jsMegaDrop').not(parentBt).removeClass('open');
		$(parentBt).toggleClass('open');
	});
	$('body').on('click', function (e) {
		if (!$('.jsMegaDrop').is(e.target) 
		&& $('.jsMegaDrop').has(e.target).length === 0 
		&& $('.open').has(e.target).length === 0
		) {
			$('.jsMegaDrop').removeClass('open');
		}
	});

	function heightMegaDrop() {
		var heightHeader = $('.main_header').height();
		var heightForScroll = $(window).height() - heightHeader;
		$('.scroll_notification .scroller').css('max-height', heightForScroll - 70);
		$('.box_user_drop .scroller').css('max-height', heightForScroll - 20);
	}
	heightMegaDrop();
	$(window).resize(function() {
		heightMegaDrop()
	});


	// editable
	$('.jsEditCollection').editable({
		placement: 'bottom',
		emptytext: 'Add a description of your collection here',
		mode: 'inline'
	});
	$('.jsEditWantListings').editable({
		placement: 'top',
		emptytext: 'Create your first Want Listing',
		mode: 'inline'
	});
	$('.jsEditableTags').editable({
		emptytext: '',
		emptytext: 'What topics and authors are you most interested in?',
		select2: {
			tags: ['Astrophysics', 'Particle Physics', 'Space', 'Great Discoveries', '20th Century Scientists', 'Classical Science'],
			tokenSeparators: [",", " "]
		},
		mode: 'inline'
	});
	$('.jsEditCollection, .jsEditWantListings, .jsEditableTags').on('hidden', function(e, reason) {
		if($(this).hasClass('editable-empty')) {
			$(this).closest('.jsEditParent').addClass('empty_editable');
		}
		else{
			$(this).closest('.jsEditParent').removeClass('empty_editable');
		};
	});

	$('.jsEditCloneBt').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var editThis = $(this).attr('href');
		$(this).closest('.jsEditParent').find('.' + editThis).editable('toggle');
	})



	if ($( ".jsDropTemplate" ).length) {
		// dropzone user dropdown
		Dropzone.autoDiscover = false;
		var previewNode = document.querySelector(".jsDropTemplate");
		previewNode.id = "";
		var previewTemplate = previewNode.parentNode.innerHTML;
		previewNode.parentNode.removeChild(previewNode);
		function dropInit () {
			if ($( ".jsUserDropAva" ).length) {
				$(".jsUserDropAva").dropzone({
					url: "upload.php",
					autoProcessQueue: false,
					previewTemplate: previewTemplate,
					acceptedFiles: 'image/*',
					maxFiles:1,
					thumbnailWidth: 320,
					thumbnailHeight: 320,
					init: function() {
						this.on("maxfilesexceeded", function(file) {
							this.removeAllFiles();
							this.addFile(file);
						});
					}
				});
			}
		}
		dropInit();
	}

	$('.jsDelBt').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.wrapper_product').remove();
	})


});