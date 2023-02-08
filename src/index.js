import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';
import './editor.scss';
import {
	InspectorControls
} from '@wordpress/block-editor';
import { Icon, Button, PanelBody } from '@wordpress/components';
import { gutenaEcosysOnboardIsEmpty } from './helper';
import GutenaKitInstallCTAPanel from './components/GutenaKitInstallCTAPanel';

/**
 * Override the default edit UI to include gutena CTA
 *
 * @param {Function} BlockEdit Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withGutenaKitInstallCTA = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { name: blockName } = props;
		const requireInstallCTA = ( -1 !== gutenaEcosysOnboardData.gutena_plugins_blockname.indexOf( blockName ) );

		return [
			requireInstallCTA && <GutenaKitInstallCTAPanel key="gutenacta" { ...props } />,
			<BlockEdit key="edit" { ...props } />,
		];
	},
	'withGutenaKitInstallCTA'
);

if ( ! gutenaEcosysOnboardIsEmpty( gutenaEcosysOnboardData ) && '1' == gutenaEcosysOnboardData.gutena_kit_require ) {
	addFilter(
		'editor.BlockEdit',
		'gutena/editor/with-gutenakit-install-cta',
		withGutenaKitInstallCTA
	);
}

