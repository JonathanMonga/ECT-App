@file:Suppress("REDUNDANT_LABEL_WARNING")

package com.jonathan.ect

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.webkit.*
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import android.net.Uri
import android.view.Window
import androidx.appcompat.app.AlertDialog


class MainActivity : AppCompatActivity() {
    companion object {
        fun newIntent(context: Context): Intent {
            return Intent(context, MainActivity::class.java)
        }
    }

    lateinit var cookieManager: CookieManager
    private var back = false
    lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled", "AddJavascriptInterface")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val sharePrefenrence = getSharedPreferences("ect_app", Context.MODE_PRIVATE)

        if (!sharePrefenrence.contains("first_run")) {
            startActivity(WelcomeActivity.newIntent(this))
            finish()
        }

        webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.javaScriptCanOpenWindowsAutomatically = true
        webView.settings.setSupportZoom(false)
        webView.webViewClient = WebViewClient()
        webView.settings.setAppCacheEnabled(true)
        webView.settings.cacheMode = WebSettings.LOAD_CACHE_ELSE_NETWORK
        webView.settings.setRenderPriority(WebSettings.RenderPriority.HIGH)
        if (Build.VERSION.SDK_INT >= 19) {
            webView.setLayerType(2, null)
        } else if (Build.VERSION.SDK_INT >= 11) {
            webView.setLayerType(1, null)
        }
        webView.settings.setAppCachePath("/data/data$packageName/cache")
        webView.settings.allowFileAccess = true
        webView.settings.saveFormData = true
        webView.settings.useWideViewPort = true
        webView.settings.loadWithOverviewMode = true
        webView.settings.javaScriptEnabled = true
        webView.settings.databaseEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.pluginState = WebSettings.PluginState.ON
        webView.isHapticFeedbackEnabled = true
        webView.isHorizontalScrollBarEnabled = true
        webView.isVerticalScrollBarEnabled = true
        webView.isLongClickable = true

        webView.settings.setGeolocationEnabled(true)
        if (Build.VERSION.SDK_INT >= 16) {
            webView.settings.allowFileAccessFromFileURLs = true
            webView.settings.allowUniversalAccessFromFileURLs = true
        }

        webView.loadUrl("file:///android_asset/site/index.html")
        setContentView(webView)

        webView.settings.setSupportZoom(true)
        webView.settings.builtInZoomControls = true
        webView.settings.displayZoomControls = true
        webView.addJavascriptInterface(JavascriptInterfaceClass(this, this), "Website2APK")

        cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.acceptCookie()
        CookieSyncManager.createInstance(this)
        if (Build.VERSION.SDK_INT > 21)
            cookieManager.setAcceptThirdPartyCookies(webView, true)
        if (savedInstanceState != null) webView.restoreState(savedInstanceState)
    }

    override fun onResume() {
        CookieSyncManager.getInstance().startSync()
        webView.onResume()
        super.onResume()
    }

    override fun onPause() {
        CookieSyncManager.getInstance().stopSync()
        webView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        cookieManager.removeExpiredCookie()
    }

    override fun onBackPressed() {
        when {
            back -> back()
            webView.canGoBack() -> {
                webView.goBack()
                back = java.lang.Boolean.valueOf(true)
            }
            else -> back()
        }

        Handler().postDelayed({ back = java.lang.Boolean.valueOf(false) }, 200L)
    }

    fun back() {
        AlertDialog.Builder(this).setTitle("Are you sure to exit?").setNegativeButton("Annuler", null)
            .setPositiveButton("Ok") { _, _ -> this@MainActivity.finish() }.create().show()
    }

    inner class JavascriptInterfaceClass internal constructor(
        internal var activity: MainActivity,
        internal var context: Context
    ) {

        @JavascriptInterface
        fun getUniqueDeviceID() {
        }

        @JavascriptInterface
        fun getAskEnableGPS() {
        }

        @JavascriptInterface
        fun exitApp() {
            activity.back()
        }

        @JavascriptInterface
        fun openExternal(param1String: String) {
            val intent = Intent("android.intent.action.VIEW", Uri.parse(param1String))
            activity.startActivity(intent)
        }

        @JavascriptInterface
        fun rateUs() {
        }

        @JavascriptInterface
        fun shareIntent() {
            val intent = Intent("android.intent.action.SEND")
            intent.type = "text/plain"
            intent.putExtra("android.intent.extra.SUBJECT", true)
            intent.putExtra("android.intent.extra.TEXT", true)
            activity.startActivity(intent.selector)
        }

        @JavascriptInterface
        fun showAboutDialog() {
        }

        @JavascriptInterface
        fun showAboutDialog(param1String1: String, param1String2: String, param1String3: String) {
        }

        @JavascriptInterface
        fun showToast(param1String: String) {
            Toast.makeText(activity, param1String, Toast.LENGTH_LONG).show()
        }
    }
}