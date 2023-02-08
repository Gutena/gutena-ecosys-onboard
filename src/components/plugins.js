import apiFetch from '@wordpress/api-fetch';

/**
 * Activates an installed plugin.
 *
 * @param {string} slug Plugin slug.
 */
async function activatePlugin( slug ) {
	const pluginsMap = await pluginsMapPromise;
	const plugin = pluginsMap[ slug ];

	await apiFetch( {
		method: 'PUT',
		path: `/wp/v2/plugins/${ plugin }`,
		data: { status: 'active' },
	} );
}

/**
 * Deactivates an active plugin.
 *
 * @param {string} slug Plugin slug.
 */
async function deactivatePlugin( slug ) {
	const pluginsMap = await pluginsMapPromise;
	const plugin = pluginsMap[ slug ];

	await apiFetch( {
		method: 'PUT',
		path: `/wp/v2/plugins/${ plugin }`,
		data: { status: 'inactive' },
	} );
}

export { activatePlugin, deactivatePlugin };
