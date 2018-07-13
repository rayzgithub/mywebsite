<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '18671362731@Fb');

/** MySQL hostname */
define('DB_HOST', '182.61.35.125');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'k-.#e lG*_u>rIXJ:tUhcN,F#@)}=#=rA2ACI[dZ:/4zlNPhx);va(7DgNV70/s%');
define('SECURE_AUTH_KEY',  '?P&:azZa[99TdU,6AAV,~/nYD~:?&yo;,KCiZ3u<eXT.J8(2f3/@3Byu4lH0aYy]');
define('LOGGED_IN_KEY',    'WMx%QW]Iv805Dgl#ncsFT5V{Om4SC/mE(S`mSl`8DC()%-7 A],|[vLe+Yalu|7.');
define('NONCE_KEY',        'NwNuM>r8f>pLAkM|>mLc3vCOWvY-TH+8`p^M-d})OJFxh/KY$Y}|C#3+ZgnS(,45');
define('AUTH_SALT',        '2:#|yvc3gOvt7ZA|IXrXBZfl$^)Iwt29oZD;W7k1y(WI`(U^A`WIhg qBC2Nzt#d');
define('SECURE_AUTH_SALT', '! eJR*~<H5NASWy8}~x&Gi/xyU`[p?/Gqr}=E%6HLEnzCJWr7FBOU]i}|Y.m>ekZ');
define('LOGGED_IN_SALT',   'VspSp3Y0X5;TUcL<nM F}7#s,QNNXcIAqY/U-mJ7 {EPuHpJp4^@:UPXYFIIJkp$');
define('NONCE_SALT',       'iXfme_&y!/}N;F&t`4p{t48!W=2&HtN.&G)P~zwi]@:8p6fo]D6uDMj~?^^9AL0d');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'zy_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
