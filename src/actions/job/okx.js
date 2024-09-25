const axios = require('axios');
const readline = require('readline');

function headersDefault() {
    return {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        "App-Type": "web",
        "Content-Type": "application/json",
        "Origin": "https://www.okx.com",
        "Referer": "https://www.okx.com/mini-app/racer?tgWebAppStartParam=linkCode_31347852",
        "Sec-Ch-Ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
        "X-Cdn": "https://www.okx.com",
        "X-Locale": "en_US",
        "X-Utc": "7",
        "X-Zkdex-Env": "0"
    };
}

async function postToOKXAPI(extUserId, extUserName, queryId) {
    const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/info?t=${Date.now()}`;
    const headers = { ...headersDefault(), 'X-Telegram-Init-Data': queryId };
    const payload = {
        "extUserId": extUserId,
        "extUserName": extUserName,
        "gameId": 1,
        "linkCode": "31347852"
    };

    return axios.post(url, payload, { headers });
}

async function assessPrediction(extUserId, predict, queryId) {
    const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/assess?t=${Date.now()}`;
    const headers = { ...headersDefault(), 'X-Telegram-Init-Data': queryId };
    const payload = {
        "extUserId": extUserId,
        "predict": predict,
        "gameId": 1
    };

    return axios.post(url, payload, { headers });
}

async function checkDailyRewards(extUserId, queryId) {
    const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/tasks?t=${Date.now()}`;
    const headers = { ...headersDefault(), 'X-Telegram-Init-Data': queryId };
    try {
        const response = await axios.get(url, { headers });
        const tasks = response.data.data;
        const dailyCheckInTask = tasks.find(task => task.id === 4);
        if (dailyCheckInTask) {
            if (dailyCheckInTask.state === 0) {
                log('Bắt đầu checkin...');
                await performCheckIn(extUserId, dailyCheckInTask.id, queryId);
            } else {
                log('Hôm nay bạn đã điểm danh rồi!');
            }
        }
    } catch (error) {
        log(`Lỗi kiểm tra phần thưởng hàng ngày: ${error.message}`);
    }
}

async function performCheckIn(extUserId, taskId, queryId) {
    const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/task?t=${Date.now()}`;
    const headers = { ...headersDefault(), 'X-Telegram-Init-Data': queryId };
    const payload = {
        "extUserId": extUserId,
        "id": taskId
    };

    try {
        await axios.post(url, payload, { headers });
        log('Điểm danh hàng ngày thành công!');
    } catch (error) {
        log(`Lỗi rồi:: ${error.message}`);
    }
}

function log(msg) {
    console.log(`[*] ${msg}`);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitWithCountdown(seconds) {
    for (let i = seconds; i >= 0; i--) {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${i} giây `);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('');
}

async function Countdown(seconds) {
    for (let i = seconds; i >= 0; i--) {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`[*] Chờ ${i} giây để tiếp tục...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('');
}

 function extractUserData(queryId) {
    const urlParams = new URLSearchParams(queryId);
    const user = JSON.parse(decodeURIComponent(urlParams.get('user')));
    return {
        extUserId: user.id,
        extUserName: user.username
    };
}

async function getBoosts(queryId) {
    const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/boosts?t=${Date.now()}`;
    const headers = { ...headersDefault(), 'X-Telegram-Init-Data': queryId };
    try {
        const response = await axios.get(url, { headers });
        return response.data.data;
    } catch (error) {
        console.log(`Lỗi lấy thông tin boosts: ${error.message}`);
        return [];
    }
}

async function useBoost(queryId) {
    const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/boost?t=${Date.now()}`;
    const headers = { ...headersDefault(), 'X-Telegram-Init-Data': queryId };
    const payload = { id: 1 };

    try {
        const response = await axios.post(url, payload, { headers });
        if (response.data.code === 0) {
            log('Reload Fuel Tank thành công!'.yellow);
            await Countdown(5);
        } else {
            log(`Lỗi Reload Fuel Tank: ${response.data.msg}`.red);
        }
    } catch (error) {
        log(`Lỗi rồi: ${error.message}`.red);
    }
}

async function upgradeFuelTank(queryId) {
    const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/boost?t=${Date.now()}`;
    const headers = { ...headersDefault(), 'X-Telegram-Init-Data': queryId };
    const payload = { id: 2 };

    try {
        const response = await axios.post(url, payload, { headers });
        if (response.data.code === 0) {
            log('Nâng cấp Fuel Tank thành công!'.yellow);
        } else {
            log(`Lỗi nâng cấp Fuel Tank: ${response.data.msg}`.red);
        }
    } catch (error) {
        log(`Lỗi rồi: ${error.message}`.red);
    }
}

async function upgradeTurbo(queryId) {
    const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/boost?t=${Date.now()}`;
    const headers = { ...headersDefault(), 'X-Telegram-Init-Data': queryId };
    const payload = { id: 3 };

    try {
        const response = await axios.post(url, payload, { headers });
        if (response.data.code === 0) {
            log('Nâng cấp Turbo Charger thành công!'.yellow);
        } else {
            log(`Lỗi nâng cấp Turbo Charger: ${response.data.msg}`.red);
        }
    } catch (error) {
        log(`Lỗi rồi: ${error.message}`.red);
    }
}

async function getCurrentPrice() {
    const url = 'https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT';
    try {
        const response = await axios.get(url);
        if (response.data.code === '0' && response.data.data && response.data.data.length > 0) {
            return parseFloat(response.data.data[0].last);
        } else {
            throw new Error('Lỗi khi lấy giá hiện tại');
        }
    } catch (error) {
        throw new Error(`Lỗi lấy giá hiện tại: ${error.message}`);
    }
}


export default async function runJobOKX(requestId) {
    const userData = requestId

    // const nangcapfueltank = await askQuestion('Bạn có muốn nâng cấp fuel tank không? (y/n): ');
    const hoinangcap = false;
    // const nangcapturbo = await askQuestion('Bạn có muốn nâng cấp Turbo Charger không? (y/n): ');
    const hoiturbo = false;

    while (true) {
        for (let i = 0; i < userData.length; i++) {
            const queryId = userData[i];
            const { extUserId, extUserName } = extractUserData(queryId);
            try {
                console.log(`========== Tài khoản ${i + 1} | ${extUserName} ==========`.blue);
                await checkDailyRewards(extUserId, queryId);

                let boosts = await getBoosts(queryId);
                boosts.forEach(boost => {
                    log(`${boost.context.name.green}: ${boost.curStage}/${boost.totalStage}`);
                });
                let reloadFuelTank = boosts.find(boost => boost.id === 1);
                let fuelTank = boosts.find(boost => boost.id === 2);
                let turbo = boosts.find(boost => boost.id === 3);
                if (fuelTank && hoinangcap) {
                    const balanceResponse = await postToOKXAPI(extUserId, extUserName, queryId);
                    const balancePoints = balanceResponse.data.data.balancePoints;
                    if (fuelTank.curStage < fuelTank.totalStage && balancePoints > fuelTank.pointCost) {
                        await upgradeFuelTank(queryId);

                        boosts = await getBoosts(queryId);
                        const updatedFuelTank = boosts.find(boost => boost.id === 2);
                        const updatebalanceResponse = await postToOKXAPI(extUserId, extUserName, queryId);
                        const updatedBalancePoints = updatebalanceResponse.data.data.balancePoints;
                        if (updatedFuelTank.curStage >= fuelTank.totalStage || updatedBalancePoints < fuelTank.pointCost) {
                            log('Không đủ điều kiện nâng cấp Fuel Tank!'.red);
                            continue;
                        }
                    } else {
                        log('Không đủ điều kiện nâng cấp Fuel Tank!'.red);
                    }
                }
                if (turbo && hoiturbo) {
                    const balanceResponse = await postToOKXAPI(extUserId, extUserName, queryId);
                    const balancePoints = balanceResponse.data.data.balancePoints;
                    if (turbo.curStage < turbo.totalStage && balancePoints > turbo.pointCost) {
                        await upgradeTurbo(queryId);

                        boosts = await getBoosts(queryId);
                        const updatedTurbo = boosts.find(boost => boost.id === 3);
                        const updatebalanceResponse = await postToOKXAPI(extUserId, extUserName, queryId);
                        const updatedBalancePoints = updatebalanceResponse.data.data.balancePoints;
                        if (updatedTurbo.curStage >= turbo.totalStage || updatedBalancePoints < turbo.pointCost) {
                            log('Nâng cấp Turbo Charger không thành công!'.red);
                            continue;
                        }
                    } else {
                        log('Không đủ điều kiện nâng cấp Turbo Charger!'.red);
                    }
                }
                
                while (true) {
                    const price1 = await getCurrentPrice();
                    await sleep(4000);
                    const price2 = await getCurrentPrice();

                    let predict;
                    let action;
                    if (price1 > price2) {
                        predict = 0; // Sell
                        action = 'Bán';
                    } else {
                        predict = 1; // Buy
                        action = 'Mua';
                    }
                    const response = await postToOKXAPI(extUserId, extUserName, queryId);
                    const balancePoints = response.data.data.balancePoints;
                    log(`${'Balance Points:'.green} ${balancePoints}`);

                    const assessResponse = await assessPrediction(extUserId, predict, queryId);
                    const assessData = assessResponse.data.data;
                    const result = assessData.won ? 'Win'.green : 'Thua'.red;
                    const calculatedValue = assessData.basePoint * assessData.multiplier;
                    log(`Dự Đoán ${action} | Kết quả: ${result} x ${assessData.multiplier}! Balance: ${assessData.balancePoints}, Nhận được: ${calculatedValue}, Giá cũ: ${assessData.prevPrice}, Giá hiện tại: ${assessData.currentPrice}`.magenta);

                    if (assessData.numChance > 0) {
                        await Countdown(1);
                    } else if (assessData.numChance <= 0 && reloadFuelTank && reloadFuelTank.curStage < reloadFuelTank.totalStage) {
                        await useBoost(queryId);

                        boosts = await getBoosts(queryId);
                        reloadFuelTank = boosts.find(boost => boost.id === 1);
                    } else {
                        break;
                    }
                }
            } catch (error) {
                log(`${'Lỗi rồi:'.red} ${error.message}`);
            }
        }
        await waitWithCountdown(600);
    }
} 
