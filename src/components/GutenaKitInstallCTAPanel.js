import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import {
	InspectorControls
} from '@wordpress/block-editor';
import { useEffect, useState } from  '@wordpress/element';
import { gutenaEcosysOnboardIsEmpty } from '../helper';


const GutenaKitInstallCTAPanel = ( { name: blockName } ) => {
	
	//ctaStatus = 0:not initiated, 1 : in progress, 2: Completed, 3:Error, 4: dismissed
	const [ ctaStatus, setCtaStatus ] = useState( 0 );

	//variable to check if gutena kit already installed but not activated
	let gutenaKitAlreadyExists = false;

	//check if gutena kit already installed but not activated
	useEffect(() => {
		let getPluginInstalled = true;
		if( getPluginInstalled ) {
			apiFetch( {
				method: 'GET',
				path: '/wp/v2/plugins'
			} ).then((res) => { 
				if ( ! gutenaEcosysOnboardIsEmpty( res ) ) {
					for (let index = 0; index < res.length; index++) {
						if ( "gutena-kit/gutena-kit" === res[index].plugin && "inactive" === res[index].status ) {
							gutenaKitAlreadyExists = true;
						}
					}
				}
			} );
		}
		return () => {
			getPluginInstalled = false;
		}
	}, []);

	//Activate Gutena Kit plugin
	const activateGutenaKit = () => {
		apiFetch( {
			method: 'PUT',
			path: '/wp/v2/plugins/gutena-kit/gutena-kit',
			data: { status: 'active' },
		} ).then((res) => { 
			setCtaStatus( 2 );
		} ).catch( ( error ) => {
			console.log("my res", error.message);
			setCtaStatus( 2 );
		} );
	}

	//Install and activate gutena kit
	const installActivateGutenaBlocks = () => { 
		
		//check if already in process 
		if ( 1 === ctaStatus ) {
			return false;
		}

		//check if process completed and click to go to complete settings page
		if ( 2 === ctaStatus ) {
			//open in new tab
			window.open( gutenaEcosysOnboardData.gk_dashboard_url, "_blank");
		}

		//Set status to in progress i.e. 1
		setCtaStatus( 1 );

		if ( true === gutenaKitAlreadyExists ) {
			//activate gutena kit if already exists
			activateGutenaKit();
		} else {
			//Install Gutena kit
			fetch(gutenaEcosysOnboardData.ajax_url, {
				method: 'POST',
				credentials: 'same-origin', // <-- make sure to include credentials
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
					'X-WP-Nonce' : gutenaEcosysOnboardData.nonce
				},
				body: new URLSearchParams({
					action: gutenaEcosysOnboardData.install_action,
					_ajax_nonce: gutenaEcosysOnboardData.nonce,
					slug: 'gutena-kit'
				})
			}).then((response) => response.json()).then((data) => { 	
				//activate gutena kit after successfully installtion or if already exists	
				if ( true === data.success || ( false === data.success && 'folder_exists' === data.data.errorCode ) ) {
					activateGutenaKit();
				}
			} );
		}
	}

	//Dismiss CTA
	const dismissCta = () => {
		//Install Gutena kit
		fetch(gutenaEcosysOnboardData.ajax_url, {
			method: 'POST',
			credentials: 'same-origin', // <-- make sure to include credentials
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'X-WP-Nonce' : gutenaEcosysOnboardData.nonce
			},
			body: new URLSearchParams({
				action: gutenaEcosysOnboardData.dismiss_action,
				_ajax_nonce: gutenaEcosysOnboardData.nonce
			})
		}).then((response) => response.json()).then((data) => { 	
			setCtaStatus( 4 );
		} ).catch((error) => {
			console.error('Error:', error);
			setCtaStatus( 4 );
		});
	}

	 //Get content details
	 const getDetails = ( keyName = 'btnName' ) => {
        let btnName = __( 'Install Gutena kit' );
		let discription = __( 'Get access to blocks and pre-made templates.' );
        switch ( ctaStatus ) {
            case 1://In progress
                btnName = __( 'Installing...' );
            break;
            case 2://Success
                btnName = __( 'Complete setup' );
				discription = __( 'Gutena Kit Installed Successfully.' );
            break;
            case 3://failed
                btnName = __( 'Failed to install' );
            break;
            default:
            break;
        }
        return 'btnName' === keyName ? btnName: discription;
    }

	return (
		4 !== ctaStatus && (
		<InspectorControls>
			<div className="gutena-inspector-cta" style={ { backgroundImage: 'url('+ gutenaEcosysOnboardData.icons.bg_img+' )' } } >
				<div className="gutena-cta-dismiss">
					<img 
					src={ gutenaEcosysOnboardData.icons.close_img } 
					className="gutena-cta-dismiss-icon" 
					onClick={ ()=> dismissCta() }
					/>
				</div>
				<div className="gutena-cta-body">
					<div className="gutena-cta-logo">
						<img 
						src={ gutenaEcosysOnboardData.icons.logo_img } 
						alt="logo"
						/>
					</div>
					<div className="gutena-cta-content">
						<h5 className="gutena-cta-discription" >
						{ getDetails( 'discription' ) }
						</h5>
						<div 
						onClick={()=>installActivateGutenaBlocks()}
						className={ `gutena-cta-install-btn ${ 1 === ctaStatus ? "start-installing":"" }` }
						>
							{/* initial btn */}
							{
								2 !== ctaStatus && 
								<img 
									src={ gutenaEcosysOnboardData.icons.install_img } 
									alt="install-icon"
									className="gutena-cta-icon"
								/>
							}
						
							{ getDetails( 'btnName' ) }

							{/* on complete installation */}
							{ 
								2 === ctaStatus &&
								<img 
								src={ gutenaEcosysOnboardData.icons.right_arrow_dark } 
								alt="link-icon"
								className="gutena-cta-icon"
							   />
							}

						</div>
						<a 
						className="gutena-cta-web-link" 
						href={gutenaEcosysOnboardData.gutena_weblink} 
						target="_blank"
						>
							{
								__( 'Visit Website' )
							}
							<img 
								src={ gutenaEcosysOnboardData.icons.right_arrow } 
								alt="link-icon"
								className="gutena-cta-icon"
							/>
						</a>
					</div>
				</div>
			</div>
		</InspectorControls>
		)
	);
}

export default GutenaKitInstallCTAPanel;