package com.jonathan.ect

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.github.paolorotolo.appintro.AppIntro
import com.github.paolorotolo.appintro.AppIntroFragment
import com.github.paolorotolo.appintro.model.SliderPage

class WelcomeActivity : AppIntro() {
    companion object {
        fun newIntent(context: Context): Intent {
            return Intent(context, WelcomeActivity::class.java)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val sliderPage1 = SliderPage()
        with(sliderPage1){
            this@with.title = "Bienvenue!"
            this@with.imageDrawable = R.drawable.ect_logo
            this@with.bgColor = Color.parseColor("#388E3C")
        }

        addSlide(AppIntroFragment.newInstance(sliderPage1))

        val sliderPage2 = SliderPage()
        with(sliderPage2){
            this@with.title = "Parti politique"
            this@with.description = "Eveil de la Conscience pour le Travail et la Démocratie."
            this@with.imageDrawable = R.drawable.ect_logo
            this@with.bgColor = Color.parseColor("#388E3C")
        }
        addSlide(AppIntroFragment.newInstance(sliderPage2))

        val sliderPage3 = SliderPage()
        with(sliderPage3) {
            this@with.description = "Vous allez changer notre Congo!"
            this@with.imageDrawable = R.drawable.ect_logo
            this@with.bgColor = Color.parseColor("#388E3C")
        }
        addSlide(AppIntroFragment.newInstance(sliderPage3))
    }

    override fun onSkipPressed(currentFragment: Fragment?) {
        super.onSkipPressed(currentFragment)

        val sharePrefenrence = getSharedPreferences("ect_app", Context.MODE_PRIVATE)

        val editor = sharePrefenrence.edit()
        editor.putBoolean("first_run", false)
        editor.apply()

        MainActivity.newIntent(this)
        finish()
    }

    override fun onDonePressed(currentFragment: Fragment?) {
        super.onDonePressed(currentFragment)

        val sharePrefenrence = getSharedPreferences("ect_app", Context.MODE_PRIVATE)

        val editor = sharePrefenrence.edit()
        editor.putBoolean("first_run", false)
        editor.apply()

        startActivity(MainActivity.newIntent(this))

        finish()
    }
}